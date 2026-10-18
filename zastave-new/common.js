/* Zajednički deo: zvuk, dugme "Nazad" (i daljinski), kretanje fokusa strelicama. */
(function(){
  var AC=window.AudioContext||window.webkitAudioContext,ctx=null,muted=false;
  try{muted=localStorage.getItem('tvi-muted')==='1'}catch(e){}
  function ac(){
    if(!AC)return null;
    if(!ctx)ctx=new AC();
    if(ctx.state==='suspended')ctx.resume();
    return ctx;
  }
  function tone(f,d,type,when,vol){
    if(muted)return;
    var c=ac();if(!c)return;
    var t=c.currentTime+(when||0),o=c.createOscillator(),g=c.createGain();
    o.type=type||'sine';o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(vol||0.14,t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+0.05);
  }
  window.Snd={
    tone:tone,
    put:function(){tone(420,.12,'triangle')},
    pop:function(){tone(560,.12,'triangle')},
    step:function(){tone(190,.05,'triangle',0,.05)},
    eat:function(){tone(660,.08,'square',0,.06);tone(880,.1,'square',.07,.06)},
    soft:function(){tone(320,.18,'sine');tone(250,.22,'sine',.1)},
    win:function(){[523,659,784,1047].forEach(function(f,i){tone(f,.28,'sine',i*.13)})},
    get muted(){return muted},
    toggle:function(){
      muted=!muted;
      try{localStorage.setItem('tvi-muted',muted?'1':'0')}catch(e){}
      return muted;
    }
  };

  /* Zvučno dugme (ako postoji #snd) */
  function paintSnd(b){b.textContent=Snd.muted?'🔇':'🔊';b.setAttribute('aria-label',Snd.muted?'Uključi zvuk':'Isključi zvuk')}
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('snd');
    if(!b)return;
    paintSnd(b);
    b.addEventListener('click',function(){Snd.toggle();paintSnd(b);Snd.pop()});
  });

  /* Kretanje fokusa strelicama (za daljinski i tastaturu) */
  function focusables(scope){
    return Array.prototype.slice.call(scope.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]'))
      .filter(function(el){return el.offsetParent!==null});
  }
  function move(dir,scope){
    var els=focusables(scope),cur=els.indexOf(document.activeElement)>=0?document.activeElement:null;
    if(!cur){if(els[0]){els[0].focus();return true}return false}
    var r=cur.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,best=null,bs=1e9;
    els.forEach(function(el){
      if(el===cur)return;
      var q=el.getBoundingClientRect(),dx=q.left+q.width/2-cx,dy=q.top+q.height/2-cy,ok,main,off;
      if(dir==='left'){ok=dx<-4;main=-dx;off=Math.abs(dy)}
      else if(dir==='right'){ok=dx>4;main=dx;off=Math.abs(dy)}
      else if(dir==='up'){ok=dy<-4;main=-dy;off=Math.abs(dx)}
      else{ok=dy>4;main=dy;off=Math.abs(dx)}
      if(!ok)return;
      var s=main+off*2.2;
      if(s<bs){bs=s;best=el}
    });
    if(best){best.focus();return true}
    return false;
  }
  var DIRS={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};

  window.TV={
    /* Vraća element unutar kog strelice pomeraju fokus, ili null (strelice tada pripadaju igri). */
    navScope:function(){return document.body},
    /* Šta radi "Nazad" (Esc, Backspace, taster Nazad na Samsung/LG daljinskom). */
    onBack:function(){TV.home()},
    home:function(){location.href='index.html'},
    focusFirst:function(scope){var e=focusables(scope||document.body);if(e[0])e[0].focus()}
  };

  document.addEventListener('keydown',function(e){
    var back=e.key==='Escape'||e.key==='Backspace'||e.key==='GoBack'||e.keyCode===10009||e.keyCode===461;
    if(back){e.preventDefault();TV.onBack();return}
    var d=DIRS[e.key];
    if(d){
      var scope=TV.navScope();
      if(scope){e.preventDefault();move(d,scope)}
    }
  });
})();
