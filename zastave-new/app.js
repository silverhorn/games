(function(){
  var $=function(id){return document.getElementById(id)};
  var CONTS=WD.CONTINENTS,COUNTRIES=WD.countries,RELIEF=WD.relief,TRIVIA=WD.trivia,LM=WD.landmarks,SHAPES=WD.shapes,NB=WD.borders;
  var byId={},contById={},reliefById={},lmById={};
  COUNTRIES.forEach(function(c){byId[c.id]=c;c.shape=SHAPES[c.id]||null;c.nb=(NB[c.id]||[]).filter(function(x){return byId[x]||true})});
  CONTS.forEach(function(c){contById[c.id]=c});
  RELIEF.forEach(function(r){reliefById[r.id]=r});
  LM.forEach(function(l){lmById[l.id]=l});

  /* karta sveta se crta jednom i ponavlja */
  document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><path id="landp" d="'+WD.land+'"/></defs></svg>');

  var store={learned:{},best:{}};
  try{var st=JSON.parse(localStorage.getItem('tvi-zn-new')||'null');if(st&&st.learned){store=st;if(!store.best)store.best={}}}catch(e){}
  function save(){try{localStorage.setItem('tvi-zn-new',JSON.stringify(store))}catch(e){}}

  function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
  function pick(a,n){return shuffle(a).slice(0,n)}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
  var PRAISE=['Bravo!','Tačno!','Super!','Odlično!','Bravo, majstore!'];

  /* ---------- crteži ---------- */
  function flagImg(id){return '<img src="flags/'+id.toLowerCase()+'.svg" alt="" draggable="false">'}
  function flagBox(id){return '<div class="flagbox">'+flagImg(id)+'</div>'}
  function shapeSvg(id){return '<svg viewBox="0 0 100 70" aria-hidden="true"><path d="'+SHAPES[id]+'"/></svg>'}
  function shapeBox(id){return '<div class="shapebox">'+shapeSvg(id)+'</div>'}
  function lmSvg(l){return '<svg viewBox="0 0 120 90" aria-hidden="true">'+l.draw()+'</svg>'}
  function mapHtml(it){
    var x=it.lon+180,y=90-it.lat,vw=120,vh=69,vx=Math.max(0,Math.min(360-vw,x-vw/2)),vy=Math.max(0,Math.min(180-vh,y-vh/2));
    function dot(r1,r2){return '<circle cx="'+x+'" cy="'+y+'" r="'+r1+'" fill="#ff3b3b" stroke="#fff" stroke-width="'+r1/3+'"/>'+
      '<circle cx="'+x+'" cy="'+y+'" r="'+r1+'" fill="none" stroke="#ff3b3b" stroke-width="'+r1/4+'"><animate attributeName="r" values="'+r1+';'+r2+'" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite"/></circle>'}
    var base='<rect width="360" height="180" fill="#3b8fd3"/><use href="#landp" fill="#86d27f" stroke="#5fae62" stroke-width=".3"/>';
    return '<div class="mapwrap"><svg viewBox="'+vx+' '+vy+' '+vw+' '+vh+'" aria-hidden="true">'+base+dot(2.4,7)+'</svg>'+
      '<div class="inset"><svg viewBox="0 0 360 180" aria-hidden="true">'+base+'<rect x="'+vx+'" y="'+vy+'" width="'+vw+'" height="'+vh+'" fill="none" stroke="#fff" stroke-width="2"/>'+dot(5,14)+'</svg></div></div>';
  }

  /* ---------- ekrani ---------- */
  var screens=['hub','modes','play','result','album'],cur='hub';
  function show(name){
    cur=name;
    screens.forEach(function(s){$(s).hidden=s!==name});
    $('backBtn').hidden=name==='hub';
    window.scrollTo(0,0);
  }

  /* ---------- kategorije ---------- */
  var CATS=[
    {id:'flags',icon:'🚩',name:'Zastave',desc:'Čija je ovo zastava?',color:'#5b8def',modes:true,pre:'f'},
    {id:'capitals',icon:'🏙️',name:'Glavni gradovi',desc:'Koji grad je glavni?',color:'#f0a23a',modes:true,pre:'p'},
    {id:'shapes',icon:'🗺️',name:'Oblik i granice',desc:'Prepoznaj državu po obliku. Ko su joj komšije?',color:'#4cc29a',modes:true,pre:'s'},
    {id:'relief',icon:'🌋',name:'Planine, reke, vulkani',desc:'Gde je Everest, a gde Nil?',color:'#ef6b6b',pre:'r'},
    {id:'landmarks',icon:'🗼',name:'Znamenitosti',desc:'Koja građevina je u kom gradu?',color:'#b97be6',pre:'l'},
    {id:'mixed',icon:'⭐',name:'Veliki kviz',desc:'Pomešana pitanja iz svega.',color:'#ffd24a'}
  ];
  var catById={};CATS.forEach(function(c){catById[c.id]=c});

  function eligible(cat){
    if(cat==='capitals')return COUNTRIES.filter(function(c){return c.capital});
    if(cat==='shapes')return COUNTRIES.filter(function(c){return c.shape});
    return COUNTRIES;
  }
  var KOMSIJE=['RS'].concat((NB.RS||[]).filter(function(x){return byId[x]}));
  function poolFor(cat,mode){
    var base=eligible(cat);
    if(mode==='world')return base;
    if(mode==='komsije')return base.filter(function(c){return KOMSIJE.indexOf(c.id)>=0});
    return base.filter(function(c){return c.cont===mode});
  }
  function learnedCount(pre,list){return list.filter(function(id){return store.learned[pre+':'+id]}).length}
  function catProgress(c){
    if(c.pre==='r')return learnedCount('r',RELIEF.map(function(x){return x.id}))+' od '+RELIEF.length;
    if(c.pre==='l')return learnedCount('l',LM.map(function(x){return x.id}))+' od '+LM.length;
    if(c.pre){var pool=eligible(c.id);return learnedCount(c.pre,pool.map(function(x){return x.id}))+' od '+pool.length}
    return '';
  }
  function starsText(n){return n?'★'.repeat(n)+'☆'.repeat(3-n):''}
  function paintHub(){
    $('cats').innerHTML=CATS.map(function(c){
      var best=Math.max(0,store.best[c.id]||0);
      var pg=catProgress(c);
      return '<button class="cat" type="button" data-cat="'+c.id+'" style="--c:'+c.color+'"><span class="ic">'+c.icon+'</span><span><b>'+c.name+'</b><small>'+c.desc+'</small>'+
        (pg||best?'<span class="pg">'+(pg?'Naučeno: '+pg+' ':'')+starsText(best)+'</span>':'')+'</span></button>';
    }).join('');
  }
  $('cats').addEventListener('click',function(e){
    var b=e.target.closest('[data-cat]');if(!b)return;
    var c=catById[b.dataset.cat];
    if(c.modes)openModes(c);else startRound(c.id,'all');
  });

  var modeCat=null;
  function openModes(c){
    modeCat=c;
    $('modeTitle').textContent=c.icon+' '+c.name;
    $('modeSub').textContent='Izaberi gde putuješ.';
    var h='';
    var all=poolFor(c.id,'world');
    h+='<button class="cont wide" type="button" data-mode="world"><b>🌍 Ceo svet</b><small>'+all.length+' država '+starsText(store.best[c.id+':world']||0)+'</small></button>';
    var kp=poolFor(c.id,'komsije');
    h+='<button class="cont wide" type="button" data-mode="komsije" style="--c:#c6363c"><b>Srbija i komšije</b><small>'+kp.length+' država oko nas '+starsText(store.best[c.id+':komsije']||0)+'</small></button>';
    CONTS.forEach(function(k){
      var n=poolFor(c.id,k.id).length;
      h+='<button class="cont" type="button" data-mode="'+k.id+'" style="--c:'+k.color+'"><b>'+k.name+'</b><small>'+n+' država '+starsText(store.best[c.id+':'+k.id]||0)+'</small></button>';
    });
    $('conts').innerHTML=h;
    show('modes');
    $('conts').querySelector('.cont').focus({preventScroll:true});
  }
  $('conts').addEventListener('click',function(e){
    var b=e.target.closest('[data-mode]');if(!b)return;
    startRound(modeCat.id,b.dataset.mode);
  });

  /* ---------- pomoćne funkcije za pitanja ---------- */
  function sameCountry(a,b){return a.id===b.id}
  /* ponuđeni pogrešni odgovori: države koje ne liče i (u celom svetu) pretežno sa istog kontinenta */
  function otherCountries(ans,pool,k,opts){
    opts=opts||{};
    var ok=pool.filter(function(x){
      if(x.id===ans.id)return false;
      if(opts.sim&&ans.grp&&x.grp===ans.grp)return false;
      if(opts.skip&&opts.skip.indexOf(x.id)>=0)return false;
      if(opts.need&&!x[opts.need])return false;
      return true;
    });
    var same=shuffle(ok.filter(function(x){return x.cont===ans.cont})).slice(0,k>2?2:1);
    var rest=shuffle(ok.filter(function(x){return same.indexOf(x)<0}));
    var res=same.concat(rest).slice(0,k);
    if(res.length<k){
      /* premalo država u oblasti (npr. Okeanija): dopuni iz celog sveta */
      var extra=shuffle(COUNTRIES.filter(function(x){
        if(x.id===ans.id||res.indexOf(x)>=0)return false;
        if(opts.sim&&ans.grp&&x.grp===ans.grp)return false;
        if(opts.need&&!x[opts.need])return false;
        return true;
      }));
      res=res.concat(extra).slice(0,k);
    }
    return res;
  }
  function uniqLabels(list,keyFn){var seen={},out=[];list.forEach(function(x){var k=keyFn(x);if(!seen[k]){seen[k]=1;out.push(x)}});return out}
  function cOpt(c){return {id:c.id,label:c.name}}

  /* ---------- pravljenje pitanja ---------- */
  var BUILD={};
  /* ZASTAVE */
  BUILD.fname=function(c,pool){
    var o=[c].concat(otherCountries(c,pool,3,{sim:true}));
    return {type:'fname',prompt:'Čija je ovo zastava?',media:flagBox(c.id),opts:shuffle(o).map(cOpt),right:c.id,
      line:'Ovo je zastava: '+c.name,fact:c.fact,learn:'f:'+c.id,subject:c.id};
  };
  BUILD.fflag=function(c,pool){
    var o=[c].concat(otherCountries(c,pool,3,{sim:true}));
    return {type:'fflag',prompt:'Pronađi zastavu: <b>'+esc(c.name)+'</b>',media:'',optMode:'img',
      opts:shuffle(o).map(function(x){return {id:x.id,label:x.name,html:'<span class="fl">'+flagImg(x.id)+'</span>'}}),right:c.id,
      line:'To je zastava: '+c.name,fact:c.fact,learn:'f:'+c.id,subject:c.id};
  };
  BUILD.fcont=function(c){
    var others=pick(CONTS.filter(function(k){return k.id!==c.cont}),3);
    var o=shuffle([contById[c.cont]].concat(others));
    return {type:'fcont',prompt:'Na kom kontinentu je ova zemlja?',media:flagBox(c.id),opts:o.map(function(k){return {id:k.id,label:k.name}}),right:c.cont,
      line:c.name+' — '+contById[c.cont].name,fact:c.fact,learn:'f:'+c.id,subject:c.id};
  };
  /* GLAVNI GRADOVI */
  function capOpts(c,pool){
    var o=[c].concat(otherCountries(c,pool,6,{need:'capital'}));
    o=uniqLabels(o,function(x){return x.capital});
    if(o.indexOf(c)<0)o.unshift(c);
    return shuffle(o.slice(0,4));
  }
  BUILD.cflag=function(c,pool){
    var o=capOpts(c,pool);
    return {type:'cflag',prompt:'Koji je glavni grad ove države?',media:flagBox(c.id),opts:o.map(function(x){return {id:x.id,label:x.capital}}),right:c.id,
      line:'Glavni grad države '+c.name+' je '+c.capital,fact:c.fact,learn:'p:'+c.id,subject:c.id};
  };
  BUILD.cname=function(c,pool){
    var o=capOpts(c,pool);
    return {type:'cname',prompt:'Koji je glavni grad države: <b>'+esc(c.name)+'</b>?',media:'',opts:o.map(function(x){return {id:x.id,label:x.capital}}),right:c.id,
      line:'Glavni grad države '+c.name+' je '+c.capital,fact:c.fact,learn:'p:'+c.id,subject:c.id,reveal:c.shape?shapeBox(c.id):flagBox(c.id)};
  };
  BUILD.ccountry=function(c,pool){
    var o=[c].concat(otherCountries(c,pool,3,{need:'capital'}));
    return {type:'ccountry',prompt:'Čiji je glavni grad <b>'+esc(c.capital)+'</b>?',media:'',opts:shuffle(o).map(cOpt),right:c.id,
      line:c.capital+' je glavni grad države: '+c.name,fact:c.fact,learn:'p:'+c.id,subject:c.id,reveal:flagBox(c.id)};
  };
  /* OBLIK I GRANICE */
  BUILD.sname=function(c,pool){
    var o=[c].concat(otherCountries(c,pool,3,{need:'shape'}));
    return {type:'sname',prompt:'Koja je ovo država?',media:shapeBox(c.id),opts:shuffle(o).map(cOpt),right:c.id,
      line:'Ovo je '+c.name,fact:c.fact,learn:'s:'+c.id,subject:c.id,reveal:flagBox(c.id)};
  };
  BUILD.sshape=function(c,pool){
    var o=[c].concat(otherCountries(c,pool,3,{need:'shape'}));
    return {type:'sshape',prompt:'Pronađi oblik države: <b>'+esc(c.name)+'</b>',media:'',optMode:'img',
      opts:shuffle(o).map(function(x){return {id:x.id,label:x.name,html:'<span class="fl sh">'+shapeSvg(x.id)+'</span>'}}),right:c.id,
      line:'To je '+c.name,fact:c.fact,learn:'s:'+c.id,subject:c.id};
  };
  BUILD.nbr=function(c){
    var nb=c.nb.filter(function(x){return byId[x]});
    var right=byId[pick(nb,1)[0]];
    var skip=nb.concat([c.id]);
    var pool=COUNTRIES.filter(function(x){return skip.indexOf(x.id)<0});
    var near=shuffle(pool.filter(function(x){return x.cont===c.cont})).slice(0,2);
    var far=shuffle(pool.filter(function(x){return near.indexOf(x)<0&&x.cont!==c.cont})).slice(0,3-near.length);
    var o=[right].concat(near,far);
    var names=nb.map(function(x){return byId[x].name}).join(', ');
    return {type:'nbr',prompt:'Koja država se graniči sa: <b>'+esc(c.name)+'</b>?',media:c.shape?shapeBox(c.id):flagBox(c.id),opts:shuffle(o).map(cOpt),right:right.id,
      line:c.name+' se graniči sa: '+names+'.',fact:c.fact,learn:'s:'+c.id,subject:c.id};
  };
  /* PRIRODA */
  BUILD.rclass=function(r){
    var others=pick(WD.reliefTypes.filter(function(t){return t!==r.type}),3);
    var o=shuffle([r.type].concat(others));
    return {type:'rclass',prompt:'Šta je ovo na mapi: <b>'+esc(r.name)+'</b>?',media:mapHtml(r),opts:o.map(function(t){return {id:t,label:cap(t)}}),right:r.type,
      line:r.name+' — '+r.type,fact:r.fact,learn:'r:'+r.id,subject:r.id};
  };
  BUILD.rwhere=function(r){
    var others=pick(CONTS.filter(function(k){return k.id!==r.cont}),3);
    var o=shuffle([contById[r.cont]].concat(others));
    return {type:'rwhere',prompt:'Na kom kontinentu je: <b>'+esc(r.name)+'</b>?',media:'',opts:o.map(function(k){return {id:k.id,label:k.name}}),right:r.cont,
      line:r.name+' — '+contById[r.cont].name,fact:r.fact,learn:'r:'+r.id,subject:r.id,reveal:mapHtml(r)};
  };
  BUILD.trivia=function(t,idx){
    var o=shuffle([t[1]].concat(t[2]));
    return {type:'trivia',prompt:esc(t[0]),media:'',opts:o.map(function(x){return {id:x,label:x}}),right:t[1],
      line:'Tačan odgovor: '+t[1],fact:t[3],learn:null,subject:'t'+idx};
  };
  /* ZNAMENITOSTI */
  BUILD.lcity=function(l){
    var cities=uniqLabels(shuffle(LM.filter(function(x){return x.id!==l.id&&x.city!==l.city})),function(x){return x.city}).slice(0,3);
    var o=shuffle([l].concat(cities));
    return {type:'lcity',prompt:'U kom gradu se nalazi ova građevina?',media:'<div class="lmbox">'+lmSvg(l)+'</div>',opts:o.map(function(x){return {id:x.id,label:x.city}}),right:l.id,
      line:l.name+' — '+l.city+' ('+l.country+')',fact:l.fact,learn:'l:'+l.id,subject:l.id};
  };
  BUILD.lpick=function(l){
    var others=uniqLabels(shuffle(LM.filter(function(x){return x.id!==l.id&&x.city!==l.city})),function(x){return x.city}).slice(0,3);
    var o=shuffle([l].concat(others));
    return {type:'lpick',prompt:'Koja građevina je u gradu: <b>'+esc(l.city)+'</b>?',media:'',optMode:'img',
      opts:o.map(function(x){return {id:x.id,label:x.name,html:'<span class="fl">'+lmSvg(x)+'</span>'}}),right:l.id,
      line:l.name+' — '+l.city+' ('+l.country+')',fact:l.fact,learn:'l:'+l.id,subject:l.id};
  };

  /* ---------- rundе ---------- */
  var round=null;
  function weighted(items,pre){
    return items.map(function(x){return {x:x,k:(store.learned[pre+':'+x.id]?1:0)+Math.random()*1.6}}).sort(function(a,b){return a.k-b.k}).map(function(o){return o.x});
  }
  function typesFor(cat,n,mode){
    var spec={
      flags:mode==='world'?['fname','fname','fname','fname','fname','fflag','fflag','fflag','fcont','fcont']:['fname','fname','fname','fname','fname','fname','fflag','fflag','fflag','fflag'],
      capitals:['cflag','cflag','cflag','cflag','cname','cname','cname','ccountry','ccountry','ccountry'],
      shapes:['sname','sname','sname','sname','sshape','sshape','sshape','nbr','nbr','nbr']
    }[cat];
    return shuffle(spec).slice(0,n);
  }
  function makeCountryRound(cat,mode){
    var pool=poolFor(cat,mode),n=Math.min(10,pool.length);
    var pre=catById[cat].pre;
    var items=weighted(pool,pre).slice(0,n),types=typesFor(cat,n,mode);
    var optPool=mode==='komsije'&&cat!=='capitals'?pool.concat(COUNTRIES.filter(function(x){return x.cont==='eu'&&pool.indexOf(x)<0&&(cat!=='shapes'||x.shape)})):pool;
    if(mode==='komsije'&&cat==='capitals')optPool=pool.concat(COUNTRIES.filter(function(x){return x.cont==='eu'&&x.capital&&pool.indexOf(x)<0}));
    var qs=items.map(function(c,i){
      var t=types[i];
      if(t==='fcont'&&c.amb)t='fname';
      if(t==='nbr'&&c.nb.filter(function(x){return byId[x]}).length===0)t='sname';
      return BUILD[t](c,optPool);
    });
    return qs;
  }
  function makeRound(cat,mode){
    var qs=[];
    if(cat==='flags'||cat==='capitals'||cat==='shapes')qs=makeCountryRound(cat,mode);
    else if(cat==='relief'){
      var it=weighted(RELIEF,'r'),usedT=shuffle(TRIVIA.map(function(_,i){return i})).slice(0,3);
      var cls=it.filter(function(r){return !r.noClass}).slice(0,4),wh=it.filter(function(r){return !r.noWhere&&cls.indexOf(r)<0}).slice(0,3);
      qs=cls.map(BUILD.rclass).concat(wh.map(BUILD.rwhere),usedT.map(function(i){return BUILD.trivia(TRIVIA[i],i)}));
      qs=shuffle(qs);
    }else if(cat==='landmarks'){
      var ls=weighted(LM,'l').slice(0,10);
      qs=ls.map(function(l,i){return i%3===2?BUILD.lpick(l):BUILD.lcity(l)});
      qs=shuffle(qs);
    }else if(cat==='mixed'){
      var C=weighted(COUNTRIES,'f'),used={};
      function nextC(filter){var c=C.filter(function(x){return !used[x.id]&&(!filter||filter(x))})[0];if(c)used[c.id]=1;return c}
      var W=COUNTRIES;
      var parts=[];
      var a=nextC();parts.push(BUILD.fname(a,W));
      a=nextC();parts.push(BUILD.fflag(a,W));
      a=nextC(function(x){return !x.amb});parts.push(BUILD.fcont(a,W));
      a=nextC(function(x){return x.capital});parts.push(BUILD.cname(a,W.filter(function(x){return x.capital})));
      a=nextC(function(x){return x.capital});parts.push(BUILD.ccountry(a,W.filter(function(x){return x.capital})));
      a=nextC(function(x){return x.shape});parts.push(BUILD.sname(a,W.filter(function(x){return x.shape})));
      a=nextC(function(x){return x.nb.filter(function(y){return byId[y]}).length>0});parts.push(BUILD.nbr(a));
      var rr=weighted(RELIEF,'r');
      parts.push(BUILD.rclass(rr.filter(function(r){return !r.noClass})[0]));
      parts.push(BUILD.rwhere(rr.filter(function(r){return !r.noWhere&&!r.noClass})[1]));
      var ti=Math.floor(Math.random()*TRIVIA.length);parts.push(BUILD.trivia(TRIVIA[ti],ti));
      var lm=weighted(LM,'l');parts.push(BUILD.lcity(lm[0]));parts.push(BUILD.lpick(lm[1]));
      qs=shuffle(parts);
    }
    return {cat:cat,mode:mode,qs:qs.map(function(q){q.done=false;q.first=true;q.help=false;return q}),i:0,correct:0,newly:[]};
  }
  function startRound(cat,mode){
    round=makeRound(cat,mode);
    show('play');renderQ();
  }

  /* ---------- pitanje na ekranu ---------- */
  function paintDots(){
    $('dots').innerHTML=round.qs.map(function(q,i){
      var c=i===round.i?'cur':q.done?(q.first?'ok':'miss'):'';
      return '<i class="'+c+'"></i>';
    }).join('');
  }
  function renderQ(){
    var q=round.qs[round.i];
    paintDots();
    $('fb').hidden=true;$('reveal').hidden=true;$('reveal').innerHTML='';$('nextBtn').hidden=true;$('helpBtn').hidden=false;$('helpBtn').disabled=false;
    $('opts').classList.remove('done');
    $('prompt').innerHTML=q.prompt;
    $('media').hidden=!q.media;$('media').innerHTML=q.media||'';
    var img=q.optMode==='img';
    $('opts').innerHTML=q.opts.map(function(o,i){
      if(img)return '<button class="opt imgopt" type="button" data-id="'+esc(o.id)+'" aria-label="Odgovor '+(i+1)+'">'+o.html+'<span class="cap">'+esc(o.label)+'</span></button>';
      return '<button class="opt" type="button" data-id="'+esc(o.id)+'">'+esc(o.label)+'</button>';
    }).join('');
    var f=$('opts').querySelector('.opt');if(f)f.focus({preventScroll:true});
  }
  function answer(id,btn){
    var q=round.qs[round.i];
    if(q.done||btn.disabled)return;
    if(id===q.right){
      q.done=true;
      var good=q.first&&!q.help;
      if(good){
        round.correct++;
        if(q.learn&&!store.learned[q.learn]){store.learned[q.learn]=1;round.newly.push(q.learn)}
        save();
      }
      btn.classList.add('good');
      $('opts').classList.add('done');
      [].forEach.call($('opts').querySelectorAll('.opt'),function(o){o.disabled=true});
      $('helpBtn').hidden=true;
      var head=PRAISE[Math.floor(Math.random()*PRAISE.length)];
      $('fb').innerHTML='<span class="big">'+(good?head:'Sad znaš!')+'</span>'+esc(q.line)+'<div class="fact">'+esc(q.fact)+'</div>';
      $('fb').hidden=false;
      if(q.reveal){$('reveal').innerHTML=q.reveal;$('reveal').hidden=false}
      paintDots();
      $('nextBtn').textContent=round.i===round.qs.length-1?'Završi ★':'Dalje ›';
      $('nextBtn').hidden=false;$('nextBtn').focus();
      good?Snd.pop():Snd.put();
    }else{
      q.first=false;
      btn.classList.add('bad');btn.disabled=true;
      $('fb').innerHTML='<span class="big">Skoro!</span>Probaj još jednom.';$('fb').hidden=false;
      Snd.soft();
      var nx=$('opts').querySelector('.opt:not(:disabled):not(.gone)');if(nx)nx.focus();
    }
  }
  $('opts').addEventListener('click',function(e){
    var b=e.target.closest('.opt');if(!b)return;
    answer(b.dataset.id,b);
  });
  $('helpBtn').addEventListener('click',function(){
    var q=round.qs[round.i];if(q.done)return;
    var live=[].filter.call($('opts').querySelectorAll('.opt'),function(o){return !o.disabled&&!o.classList.contains('gone')});
    var wrong=live.filter(function(o){return o.dataset.id!==q.right});
    pick(wrong,Math.min(2,wrong.length-1)).forEach(function(o){o.classList.add('gone');o.disabled=true});
    q.help=true;$('helpBtn').disabled=true;
    $('fb').innerHTML='<span class="big">Dva odgovora su sklonjena.</span>Izaberi jedan od preostalih.';$('fb').hidden=false;
    var nx=$('opts').querySelector('.opt:not(:disabled)');if(nx)nx.focus();
  });
  $('nextBtn').addEventListener('click',function(){
    if(round.i<round.qs.length-1){round.i++;renderQ()}else finish();
  });

  /* ---------- kraj runde ---------- */
  function newChip(key){
    var pre=key.split(':')[0],id=key.split(':')[1],h='';
    if(pre==='f'||pre==='p'||pre==='s'){
      var c=byId[id];
      h=pre==='s'&&c.shape?'<span class="fl sh">'+shapeSvg(id)+'</span>':'<span class="fl">'+flagImg(id)+'</span>';
      return '<div class="nf">'+h+c.name+'</div>';
    }
    if(pre==='l'){var l=lmById[id];return '<div class="nf"><span class="fl">'+lmSvg(l)+'</span>'+esc(l.name)+'</div>'}
    if(pre==='r'){var r=reliefById[id];return '<div class="nf"><span class="fl" style="padding:8px 4px;line-height:1.2">⛰️</span>'+esc(r.name)+'</div>'}
    return '';
  }
  function finish(){
    var n=round.qs.length,acc=round.correct/n,stars=acc>=.9?3:acc>=.6?2:1;
    var key=round.cat+(round.mode==='all'?'':':'+round.mode);
    if(stars>(store.best[key]||0)){store.best[key]=stars}
    if(stars>(store.best[round.cat]||0))store.best[round.cat]=stars;
    save();
    $('resTitle').textContent=stars===3?'Neverovatno!':stars===2?'Bravo!':'Dobro je krenulo!';
    $('resStars').innerHTML=[0,1,2].map(function(i){return '<span class="'+(i<stars?'':'off')+'">★</span>'}).join('');
    $('resText').textContent='Iz prvog pokušaja: '+round.correct+' tačnih od '+n+'.'+(stars<3?' Svaki put naučiš još ponešto!':'');
    var chips=round.newly.map(newChip).join('');
    $('newFlags').innerHTML=chips?'<div style="grid-column:1/-1;text-align:center;color:var(--accent);font-weight:800;font-size:18px">Novo u tvom znanju:</div>'+chips:'';
    show('result');
    stars===3?Snd.win():Snd.pop();
    $('againBtn').focus({preventScroll:true});
  }
  $('againBtn').addEventListener('click',function(){startRound(round.cat,round.mode)});
  $('homeBtn').addEventListener('click',function(){paintHub();show('hub');$('cats').querySelector('.cat').focus()});

  /* ---------- album ---------- */
  var tab='f',albumFrom='hub';
  function paintAlbum(){
    var h='',total,got;
    if(tab==='f'){
      total=COUNTRIES.length;got=COUNTRIES.filter(function(c){return store.learned['f:'+c.id]}).length;
      $('albumSub').textContent='Otkrio si '+got+' od '+total+' zastava. Pogodi zastavu iz prvog pokušaja da je dodaš.';
      CONTS.forEach(function(k){
        var pool=COUNTRIES.filter(function(x){return x.cont===k.id}),g=pool.filter(function(x){return store.learned['f:'+x.id]}).length;
        h+='<div class="album-sec" style="--c:'+k.color+'"><h2><span>'+k.name+'</span><small>'+g+' / '+pool.length+'</small></h2><div class="tiles">';
        pool.forEach(function(x){
          if(store.learned['f:'+x.id])h+='<button class="tile" type="button" data-k="c:'+x.id+'"><span class="fl">'+flagImg(x.id)+'</span>'+esc(x.name)+'</button>';
          else h+='<div class="tile locked" aria-label="Još nije otkrivena"><span class="q">?</span>&nbsp;</div>';
        });
        h+='</div></div>';
      });
    }else{
      total=LM.length;got=LM.filter(function(l){return store.learned['l:'+l.id]}).length;
      $('albumSub').textContent='Skupio si '+got+' od '+total+' razglednica. Pogodi grad građevine iz prvog pokušaja.';
      h+='<div class="album-sec" style="--c:#b97be6"><h2><span>Razglednice</span><small>'+got+' / '+total+'</small></h2><div class="tiles">';
      LM.forEach(function(l){
        if(store.learned['l:'+l.id])h+='<button class="tile" type="button" data-k="l:'+l.id+'"><span class="fl">'+lmSvg(l)+'</span>'+esc(l.name)+'</button>';
        else h+='<div class="tile locked" aria-label="Još nije otkrivena"><span class="q">?</span>&nbsp;</div>';
      });
      h+='</div></div>';
    }
    $('albumBody').innerHTML=h;
    [].forEach.call(document.querySelectorAll('[data-tab]'),function(b){b.setAttribute('aria-pressed',String(b.dataset.tab===tab))});
  }
  function openAlbum(from){albumFrom=from;paintAlbum();show('album');$('albumBack').focus({preventScroll:true})}
  $('albumBtn').addEventListener('click',function(){openAlbum('hub')});
  $('albumBtn2').addEventListener('click',function(){openAlbum('result')});
  $('albumBack').addEventListener('click',function(){
    if(albumFrom==='result'&&round)show('result');else{paintHub();show('hub')}
  });
  [].forEach.call(document.querySelectorAll('[data-tab]'),function(b){b.addEventListener('click',function(){tab=b.dataset.tab;paintAlbum()})});
  $('albumBody').addEventListener('click',function(e){
    var t=e.target.closest('.tile[data-k]');if(!t)return;
    var k=t.dataset.k.split(':'),m,name,fact;
    if(k[0]==='c'){
      var c=byId[k[1]];
      m='<div class="bigflag">'+flagImg(c.id)+'</div>';
      if(c.shape)m='<div class="twoup"><div class="bigflag" style="margin:0;width:60%">'+flagImg(c.id)+'</div><div class="shapebox">'+shapeSvg(c.id)+'</div></div>';
      name=c.name+' — '+contById[c.cont].name;
      fact=(c.capital?'Glavni grad: '+c.capital+'. ':'')+c.fact;
    }else{
      var l=lmById[k[1]];
      m='<div class="bigflag lmbox" style="background:none">'+lmSvg(l)+'</div>';name=l.name+' — '+l.city;fact=l.country+'. '+l.fact;
    }
    $('dMedia').innerHTML=m;$('dName').textContent=name;$('dFact').textContent=fact;
    $('detail').hidden=false;$('dClose').focus();
  });
  $('dClose').addEventListener('click',function(){$('detail').hidden=true});

  /* ---------- nazad i tastatura ---------- */
  function goBack(){
    if(!$('detail').hidden){$('detail').hidden=true;return}
    if(cur==='hub')return;
    if(cur==='album'){if(albumFrom==='result'&&round)show('result');else{paintHub();show('hub')}return}
    if(cur==='play'||cur==='result'){if(modeCat&&round&&catById[round.cat].modes)openModes(modeCat);else{paintHub();show('hub')}return}
    paintHub();show('hub');
  }
  TV.onBack=goBack;
  $('backBtn').addEventListener('click',goBack);
  document.addEventListener('keydown',function(e){
    if(cur!=='play'||e.ctrlKey||e.altKey)return;
    if(e.key>='1'&&e.key<='4'){
      var q=round.qs[round.i],b=$('opts').querySelectorAll('.opt')[Number(e.key)-1];
      if(b&&!q.done)answer(b.dataset.id,b);
    }
  });

  paintHub();
  $('cats').querySelector('.cat').focus({preventScroll:true});
  window.__app={get cur(){return cur},get round(){return round},store:store,makeRound:makeRound,right:function(){return round.qs[round.i].right},BUILD:BUILD,poolFor:poolFor,byId:byId,KOMSIJE:KOMSIJE};
})();
