/* Zastave sveta: crteži (SVG, bez interneta) i zanimljivosti za decu.
   Svaka zastava je nacrtana u okviru 90 x 60.  */
(function(){
  var W=90,H=60;
  function rect(x,y,w,h,c){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>'}
  function circ(x,y,r,c,ex){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+c+'"'+(ex||'')+'/>'}
  function poly(pts,c,ex){return '<polygon points="'+pts+'" fill="'+c+'"'+(ex||'')+'/>'}
  function line(x1,y1,x2,y2,c,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'"/>'}
  function hb(cols,wts){
    wts=wts||cols.map(function(){return 1});
    var t=wts.reduce(function(a,b){return a+b},0),y=0,s='';
    cols.forEach(function(c,i){var h=H*wts[i]/t;s+=rect(0,y,W,(h+.4).toFixed(2),c);y+=h});
    return s;
  }
  function vb(cols,wts){
    wts=wts||cols.map(function(){return 1});
    var t=wts.reduce(function(a,b){return a+b},0),x=0,s='';
    cols.forEach(function(c,i){var w=W*wts[i]/t;s+=rect(x.toFixed(2),0,(w+.4).toFixed(2),H,c);x+=w});
    return s;
  }
  function starN(cx,cy,R,n,c,rot,ratio){
    var pts=[],k=n*2,r0=(rot===undefined?-90:rot)*Math.PI/180;
    for(var i=0;i<k;i++){
      var a=r0+i*Math.PI/n,r=i%2?R*(ratio||(n===5?.382:.55)):R;
      pts.push((cx+Math.cos(a)*r).toFixed(2)+','+(cy+Math.sin(a)*r).toFixed(2));
    }
    return poly(pts.join(' '),c);
  }
  function cross(bg,c,xs,ys,inner){
    var sx=xs[0]+xs[1]+xs[2],sy=ys[0]+ys[1]+ys[2];
    var x0=W*xs[0]/sx,w=W*xs[1]/sx,y0=H*ys[0]/sy,h=H*ys[1]/sy;
    var s=rect(0,0,W,H,bg)+rect(x0.toFixed(2),0,w.toFixed(2),H,c)+rect(0,y0.toFixed(2),W,h.toFixed(2),c);
    if(inner){
      var f=inner[1];
      s+=rect((x0+w*(1-f)/2).toFixed(2),0,(w*f).toFixed(2),H,inner[0])+rect(0,(y0+h*(1-f)/2).toFixed(2),W,(h*f).toFixed(2),inner[0]);
    }
    return s;
  }
  function rays(cx,cy,r1,r2,n,c,w){
    var s='';
    for(var i=0;i<n;i++){
      var a=i*2*Math.PI/n;
      s+=line((cx+Math.cos(a)*r1).toFixed(2),(cy+Math.sin(a)*r1).toFixed(2),(cx+Math.cos(a)*r2).toFixed(2),(cy+Math.sin(a)*r2).toFixed(2),c,w);
    }
    return s;
  }
  function stripes9(a,b){var cols=[];for(var i=0;i<9;i++)cols.push(i%2?b:a);return hb(cols)}
  var UJ='<use href="#uj" transform="scale(1.5,2)"/>';
  var UJC='<use href="#uj" transform="scale(.75,1)"/>';

  /* Unija džek se crta jednom i ponavlja (Velika Britanija, Australija, Novi Zeland) */
  var DEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
    '<clipPath id="ujs"><path d="M0,0 v30 h60 v-30 z"/></clipPath>'+
    '<clipPath id="ujt"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>'+
    '<g id="uj"><g clip-path="url(#ujs)">'+
    '<path d="M0,0 v30 h60 v-30 z" fill="#012169"/>'+
    '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>'+
    '<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#ujt)" stroke="#C8102E" stroke-width="4"/>'+
    '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>'+
    '<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>'+
    '</g></g></defs></svg>';

  /* ----- javorov list (Kanada) ----- */
  function mapleLeaf(cx,cy,k,c){
    var R=[[0,-14],[2.2,-8.6],[4.6,-9.8],[4.0,-3.8],[9.4,-7.2],[8.0,-1.8],[11.0,0.6],[5.6,3.8],[6.4,6.8],[1.0,5.6],[0.9,14]];
    var pts=R.map(function(p){return [p[0],p[1]]});
    var left=R.slice(1).reverse().map(function(p){return [-p[0],p[1]]});
    var all=pts.concat(left);
    return poly(all.map(function(p){return (cx+p[0]*k).toFixed(2)+','+(cy+p[1]*k).toFixed(2)}).join(' '),c);
  }

  var F={};
  /* ===== EVROPA ===== */
  F.srb=function(){return hb(['#C6363C','#0C4076','#fff'])+
    '<path d="M24,15 h12 v14 q0,7 -6,9 q-6,-2 -6,-9 z" fill="#C6363C" stroke="#EDB92E" stroke-width="1.4"/>'+
    '<path d="M30,18 v16 M25.5,24 h9" stroke="#fff" stroke-width="2"/>'+
    '<path d="M24.5,14 l1.5,-4.5 l2,2.5 l2,-3.5 l2,3.5 l2,-2.5 l1.5,4.5 z" fill="#EDB92E"/>'};
  F.fra=function(){return vb(['#0055A4','#fff','#EF4135'])};
  F.ita=function(){return vb(['#009246','#fff','#CE2B37'])};
  F.deu=function(){return hb(['#000','#DD0000','#FFCE00'])};
  F.nld=function(){return hb(['#AE1C28','#fff','#21468B'])};
  F.gbr=function(){return UJ};
  F.esp=function(){return hb(['#AA151B','#F1BF00','#AA151B'],[1,2,1])};
  F.grc=function(){return stripes9('#0D5EAF','#fff')+rect(0,0,33.4,33.4,'#0D5EAF')+rect(13.4,0,6.7,33.4,'#fff')+rect(0,13.4,33.4,6.7,'#fff')};
  F.swe=function(){return cross('#006AA7','#FECC00',[5,2,9],[4,2,4])};
  F.nor=function(){return cross('#BA0C2F','#fff',[6,4,12],[6,4,6],['#00205B',.5])};
  F.dnk=function(){return cross('#C8102E','#fff',[12,4,21],[12,4,12])};
  F.fin=function(){return cross('#fff','#003580',[5,3,10],[4,3,4])};
  F.irl=function(){return vb(['#169B62','#fff','#FF883E'])};
  F.pol=function(){return hb(['#fff','#DC143C'])};
  F.ukr=function(){return hb(['#0057B7','#FFD700'])};
  F.che=function(){return rect(15,0,60,60,'#DA291C')+rect(40,12,10,36,'#fff')+rect(27,25,36,10,'#fff')};
  F.hrv=function(){
    var s=hb(['#FF0000','#fff','#171796']),i,j;
    s+='<path d="M36,16 h18 v18 q0,7 -9,10 q-9,-3 -9,-10 z" fill="#fff" stroke="#D00000" stroke-width="1.2"/>';
    for(i=0;i<5;i++)for(j=0;j<5;j++)if((i+j)%2===0)s+=rect((36+i*3.6).toFixed(1),(16+j*3.6).toFixed(1),3.6,3.6,'#FF0000');
    return s;
  };
  F.rus=function(){return hb(['#fff','#0039A6','#D52B1E'])};
  F.aut=function(){return hb(['#ED2939','#fff','#ED2939'])};

  /* ===== AZIJA ===== */
  F.jpn=function(){return rect(0,0,W,H,'#fff')+circ(45,30,18,'#BC002D')};
  F.chn=function(){
    var s=rect(0,0,W,H,'#DE2910')+starN(15,15,9,5,'#FFDE00');
    [[30,6],[36,13],[36,22],[30,29]].forEach(function(p){
      var a=Math.atan2(15-p[1],15-p[0])*180/Math.PI;
      s+=starN(p[0],p[1],3,5,'#FFDE00',a);
    });
    return s;
  };
  F.ind=function(){return hb(['#FF9933','#fff','#138808'])+
    '<circle cx="45" cy="30" r="8" fill="none" stroke="#000080" stroke-width="1"/>'+
    rays(45,30,1.5,8,24,'#000080',.6)+circ(45,30,1.6,'#000080')};
  F.tur=function(){return rect(0,0,W,H,'#E30A17')+circ(34,30,15,'#fff')+circ(38.6,30,12,'#E30A17')+starN(52,30,7,5,'#fff',-18)};
  F.vnm=function(){return rect(0,0,W,H,'#DA251D')+starN(45,31,17,5,'#FFFF00')};
  F.tha=function(){return hb(['#A51931','#F4F5F8','#2D2A4A','#F4F5F8','#A51931'],[1,1,2,1,1])};
  F.idn=function(){return hb(['#E70011','#fff'])};
  F.bgd=function(){return rect(0,0,W,H,'#006A4E')+circ(40,30,17,'#F42A41')};
  F.npl=function(){
    return '<polygon points="14,4 66,31 40,31 66,56 14,56" fill="#DC143C" stroke="#003893" stroke-width="3.2" stroke-linejoin="miter"/>'+
      circ(26,22,4.6,'#fff')+circ(26,20.4,4.1,'#DC143C')+
      starN(26,42,7,12,'#fff',-90,.7)+circ(26,42,3.2,'#DC143C');
  };
  F.phl=function(){
    var s=hb(['#0038A8','#CE1126'])+poly('0,0 0,60 52,30','#fff')+circ(15,30,4.4,'#FCD116')+rays(15,30,6,9,8,'#FCD116',1);
    [[4.5,6],[4.5,54],[45,30]].forEach(function(p){s+=starN(p[0],p[1],3.6,5,'#FCD116')});
    return s;
  };

  /* ===== AFRIKA ===== */
  F.egy=function(){return hb(['#CE1126','#fff','#000'])};
  F.nga=function(){return vb(['#008751','#fff','#008751'])};
  F.zaf=function(){
    var Y='M0,0 L35,30 L90,30 M0,60 L35,30';
    return rect(0,0,W,30,'#E03C31')+rect(0,30,W,30,'#001489')+
      '<path d="'+Y+'" fill="none" stroke="#fff" stroke-width="24"/>'+
      '<path d="'+Y+'" fill="none" stroke="#007749" stroke-width="16"/>'+
      poly('0,10.5 0,49.5 22.8,30','#FFB612')+poly('0,16 0,44 14,30','#000');
  };
  F.mar=function(){
    var pts=[],i;
    for(i=0;i<5;i++){var a=(-90+i*72)*Math.PI/180;pts.push([45+Math.cos(a)*15,32+Math.sin(a)*15])}
    var order=[0,2,4,1,3];
    var d='M'+order.map(function(k){return pts[k][0].toFixed(2)+','+pts[k][1].toFixed(2)}).join(' L')+' Z';
    return rect(0,0,W,H,'#C1272D')+'<path d="'+d+'" fill="none" stroke="#006233" stroke-width="2.2"/>';
  };
  F.gha=function(){return hb(['#CE1126','#FCD116','#006B3F'])+starN(45,31,10,5,'#000')};
  F.eth=function(){return hb(['#078930','#FCDD09','#DA121A'])+circ(45,30,15,'#0F47AF')+starN(45,30.5,11,5,'#FCDD09')};
  F.sen=function(){return vb(['#00853F','#FDEF42','#E31B23'])+starN(45,31,9,5,'#00853F')};
  F.ken=function(){return hb(['#000','#fff','#BB0000','#fff','#006600'],[6,1,6,1,6])+
    line(35,13,55,47,'#fff',1.2)+line(55,13,35,47,'#fff',1.2)+
    '<ellipse cx="45" cy="30" rx="7.5" ry="15" fill="#BB0000" stroke="#fff" stroke-width="1.4"/>'+
    '<ellipse cx="45" cy="30" rx="3" ry="10" fill="#000"/>'+rect(44.4,19,1.2,22,'#fff')};
  F.mdg=function(){return rect(0,0,30,60,'#fff')+rect(30,0,60,30,'#FC3D32')+rect(30,30,60,30,'#007E3A')};
  F.civ=function(){return vb(['#F77F00','#fff','#009E60'])};
  F.cmr=function(){return vb(['#007A5E','#CE1126','#FCD116'])+starN(45,30.5,9,5,'#FCD116')};

  /* ===== SEVERNA AMERIKA ===== */
  F.usa=function(){
    var cols=[],i,r,c,s;
    for(i=0;i<13;i++)cols.push(i%2?'#fff':'#B22234');
    s=hb(cols)+rect(0,0,36,32.3,'#3C3B6E');
    for(r=0;r<9;r++){
      var n=r%2?5:6;
      for(c=0;c<n;c++){
        var x=r%2?(c*2+2)*3:(c*2+1)*3;
        s+=starN(x,(r+1)*3.23,1.35,5,'#fff');
      }
    }
    return s;
  };
  F.can=function(){return vb(['#D52B1E','#fff','#D52B1E'],[1,2,1])+mapleLeaf(45,31,1.05,'#D52B1E')};
  F.mex=function(){return vb(['#006847','#fff','#CE1126'])+
    circ(45,30,8.5,'#C9A15A',' stroke="#6B8E23" stroke-width="1.6"')+circ(45,29,3,'#7a4b1e')+
    '<path d="M38,38 q7,5 14,0" stroke="#2f7d32" stroke-width="1.6" fill="none"/>'};
  F.cub=function(){return hb(['#002A8F','#fff','#002A8F','#fff','#002A8F'])+poly('0,0 0,60 52,30','#CF142B')+starN(16,30,10,5,'#fff')};
  F.jam=function(){return rect(0,0,W,H,'#009B3A')+poly('0,0 0,60 45,30','#000')+poly('90,0 90,60 45,30','#000')+
    line(0,0,90,60,'#FED100',10)+line(0,60,90,0,'#FED100',10)};
  F.cri=function(){return hb(['#002B7F','#fff','#CE1126','#fff','#002B7F'],[1,1,2,1,1])};
  F.pan=function(){return rect(0,0,45,30,'#fff')+rect(45,0,45,30,'#DA121A')+rect(0,30,45,30,'#072357')+rect(45,30,45,30,'#fff')+
    starN(22.5,15,8,5,'#072357')+starN(67.5,45,8,5,'#DA121A')};

  /* ===== JUŽNA AMERIKA ===== */
  F.bra=function(){
    var s=rect(0,0,W,H,'#009C3B')+poly('45,6 84,30 45,54 6,30','#FFDF00')+circ(45,30,13,'#002776');
    s+='<path d="M32.6,33 Q45,25 57.4,36" fill="none" stroke="#fff" stroke-width="2.6"/>';
    [[39,26],[44,23],[51,27],[48,35],[40,38],[55,31],[36,32]].forEach(function(p){s+=circ(p[0],p[1],.8,'#fff')});
    return s;
  };
  F.arg=function(){return hb(['#74ACDF','#fff','#74ACDF'])+circ(45,30,5.2,'#F6B40E')+rays(45,30,6.5,10,16,'#F6B40E',1)};
  F.chl=function(){return rect(0,0,W,30,'#fff')+rect(0,30,W,30,'#D52B1E')+rect(0,0,30,30,'#0039A6')+starN(15,15,9,5,'#fff')};
  F.col=function(){return hb(['#FCD116','#003893','#CE1126'],[2,1,1])};
  F.per=function(){return vb(['#D91023','#fff','#D91023'])};
  F.ven=function(){
    var s=hb(['#FFCC00','#00247D','#CF142B']),i;
    for(i=0;i<8;i++){var a=(-160+i*20)*Math.PI/180;s+=starN(45+Math.cos(a)*17,41+Math.sin(a)*17,2.3,5,'#fff')}
    return s;
  };
  F.ecu=function(){return hb(['#FFD100','#0072CE','#EF3340'],[2,1,1])+
    circ(45,30,6.5,'#8aa0b8',' stroke="#6b4a1c" stroke-width="1.2"')+circ(45,30,3,'#d9a441')};
  F.bol=function(){return hb(['#D52B1E','#F9E300','#007934'])};
  F.ury=function(){return stripes9('#fff','#0038A8')+rect(0,0,33.4,33.4,'#fff')+circ(16.7,16.7,6,'#FCD116')+rays(16.7,16.7,7,10,16,'#FCD116',1)};

  /* ===== OKEANIJA ===== */
  F.aus=function(){
    var s=rect(0,0,W,H,'#00008B')+UJC+starN(22.5,45,8,7,'#fff');
    [[67,8,3.4],[78,25,3.4],[67,50,3.4],[56,27,3.4]].forEach(function(p){s+=starN(p[0],p[1],p[2],7,'#fff')});
    s+=starN(72,33,2.1,5,'#fff');
    return s;
  };
  F.nzl=function(){
    var s=rect(0,0,W,H,'#00247D')+UJC;
    [[67,12],[56,26],[78,24],[67,50]].forEach(function(p){s+=starN(p[0],p[1],5,5,'#fff')+starN(p[0],p[1],3.6,5,'#CC142B')});
    return s;
  };
  F.wsm=function(){
    var s=rect(0,0,W,H,'#CE1126')+rect(0,0,45,30,'#002B7F');
    [[22,6],[13,14],[31,12],[22,24]].forEach(function(p){s+=starN(p[0],p[1],3.4,5,'#fff')});
    s+=starN(27,17,2.2,5,'#fff');
    return s;
  };
  F.ton=function(){return rect(0,0,W,H,'#C10000')+rect(0,0,36,30,'#fff')+rect(15,5,6,20,'#C10000')+rect(8,12,20,6,'#C10000')};
  F.plw=function(){return rect(0,0,W,H,'#4AADD6')+circ(38,30,19,'#FFDE00')};

  var CONTINENTS=[
    {id:'eu',name:'Evropa',color:'#5b8def'},
    {id:'as',name:'Azija',color:'#ef6b6b'},
    {id:'af',name:'Afrika',color:'#f0a23a'},
    {id:'na',name:'Severna Amerika',color:'#4cc29a'},
    {id:'sa',name:'Južna Amerika',color:'#b97be6'},
    {id:'oc',name:'Okeanija',color:'#3cc4d6'}
  ];

  /* g = grupa zastava koje liče jedna na drugu (ne stavljaju se zajedno u ponuđene odgovore) */
  var C=[
    ['srb','Srbija','eu','Beograd je jedan od najstarijih gradova u Evropi. U njemu se sastaju dve velike reke, Sava i Dunav.'],
    ['fra','Francuska','eu','Ajfelov toranj u Parizu leti postane malo viši jer se gvožđe na vrućini raširi.','g2'],
    ['ita','Italija','eu','Pica je izmišljena u italijanskom gradu Napulju.','g1'],
    ['deu','Nemačka','eu','Gumeni medvedići su izmišljeni u Nemačkoj.'],
    ['nld','Holandija','eu','U Holandiji ima više bicikala nego ljudi.','g2'],
    ['gbr','Velika Britanija','eu','„Big Ben“ je zapravo ime velikog zvona u tornju u Londonu, a ne ime sata.','g8'],
    ['esp','Španija','eu','U španskom gradu Buñolu ljudi se jednom godišnje gađaju paradajzom. To se zove La Tomatina.'],
    ['grc','Grčka','eu','Prve olimpijske igre održane su u staroj Grčkoj, pre skoro 2800 godina.','g11'],
    ['swe','Švedska','eu','U Švedskoj postoji hotel napravljen od leda. Svake zime ga ponovo izgrade.','g4'],
    ['nor','Norveška','eu','Na severu Norveške leti sunce ne zalazi nedeljama.','g4'],
    ['dnk','Danska','eu','Kockice LEGO izmišljene su u Danskoj.','g4'],
    ['fin','Finska','eu','U Finskoj, u gradu Rovanijemi, postoji Deda Mrazovo selo koje možeš da posetiš.','g4'],
    ['irl','Irska','eu','Irska se zove i Smaragdno ostrvo, jer je cela veoma zelena.','g1'],
    ['pol','Poljska','eu','U poljskim šumama živi evropski bizon, najteža kopnena životinja Evrope.','g3'],
    ['ukr','Ukrajina','eu','Plava boja na zastavi je kao nebo, a žuta kao polja pšenice.'],
    ['che','Švajcarska','eu','Švajcarska i Vatikan su jedine zemlje čija je zastava kvadrat.'],
    ['hrv','Hrvatska','eu','Reč „kravata“ potiče od reči „Hrvat“.','g2'],
    ['rus','Rusija','eu','Rusija je najveća zemlja na svetu. U njoj ima čak 11 vremenskih zona.','g2',1],
    ['aut','Austrija','eu','Mocart se rodio u Austriji, u Salcburgu, a muziku je počeo da komponuje sa pet godina.','g12'],

    ['jpn','Japan','as','Japan se zove i „zemlja izlazećeg sunca“. Zato je na zastavi crveni krug.'],
    ['chn','Kina','as','U Kini žive džinovske pande. U divljini ih nigde drugde nema.'],
    ['ind','Indija','as','Šah je izmišljen u Indiji, pre više od 1500 godina.'],
    ['tur','Turska','as','Istanbul je grad koji se nalazi na dva kontinenta, i u Evropi i u Aziji.','',1],
    ['vnm','Vijetnam','as','Vijetnam je jedan od najvećih proizvođača kafe na svetu.'],
    ['tha','Tajland','as','Slon je nacionalna životinja Tajlanda.'],
    ['idn','Indonezija','as','Indonezija ima oko 17.000 ostrva.','g3'],
    ['bgd','Bangladeš','as','U Bangladešu živi kraljevski bengalski tigar, koji je odličan plivač.'],
    ['npl','Nepal','as','Nepal ima jedinu zastavu na svetu koja nije pravougaona. Mont Everest, najviša planina na svetu, nalazi se na njegovoj granici sa Kinom.'],
    ['phl','Filipini','as','Filipini imaju više od 7000 ostrva.'],

    ['egy','Egipat','af','Velike piramide u Gizi stare su više od 4000 godina.'],
    ['nga','Nigerija','af','Nigerija ima najviše stanovnika u celoj Africi.'],
    ['zaf','Južna Afrika','af','Južna Afrika ima čak tri glavna grada.'],
    ['mar','Maroko','af','U Maroku možeš da se provozaš kamilom kroz peščane dine pustinje Sahare.'],
    ['gha','Gana','af','Gana je među najvećim proizvođačima kakaa, a od kakaa se pravi čokolada.','g7'],
    ['eth','Etiopija','af','Kafa potiče iz Etiopije.','g7'],
    ['sen','Senegal','af','U Senegalu postoji ružičasto jezero Retba, boje bombone.','g7'],
    ['ken','Kenija','af','U Keniji možeš da vidiš divlje lavove, slonove i žirafe na safariju.'],
    ['mdg','Madagaskar','af','Lemuri žive u divljini samo na Madagaskaru.'],
    ['civ','Obala Slonovače','af','Ime Obale Slonovače dolazi od slonovih kljova kojima se nekad trgovalo.','g1'],
    ['cmr','Kamerun','af','Kamerun zovu „Afrika u malom“ jer ima planine, šume, pustinju i plaže.','g7'],

    ['usa','SAD','na','Na planini Rašmor u SAD uklesana su lica četiri predsednika.'],
    ['can','Kanada','na','Kanada ima više jezera nego bilo koja druga zemlja na svetu.','g6'],
    ['mex','Meksiko','na','Prve čokolade pravili su stari narodi Maje i Asteci u današnjem Meksiku i okolini.','g1'],
    ['cub','Kuba','na','Na Kubi živi najmanja ptica na svetu, kolibri pčelica.'],
    ['jam','Jamajka','na','Jamajka je zemlja Usejna Bolta, najbržeg čoveka na svetu.'],
    ['cri','Kostarika','na','U šumama Kostarike žive ljenjivci, životinje koje se kreću veoma sporo.'],
    ['pan','Panama','na','Panamski kanal spaja Atlantski i Tihi okean, pa brodovi ne moraju da oplove celu Južnu Ameriku.'],

    ['bra','Brazil','sa','Najveći deo prašume Amazon nalazi se u Brazilu.'],
    ['arg','Argentina','sa','U Argentini je nastao tango, ples za dvoje.'],
    ['chl','Čile','sa','Čile je veoma dugačak, preko 4000 kilometara, a veoma uzak.'],
    ['col','Kolumbija','sa','Kolumbija ima više vrsta ptica nego bilo koja druga zemlja.','g5'],
    ['per','Peru','sa','U Peruu se nalazi Maču Pikču, drevni grad Inka visoko u planinama.','g6'],
    ['ven','Venecuela','sa','U Venecueli je Anhel, najviši vodopad na svetu, visok skoro 1000 metara.','g5'],
    ['ecu','Ekvador','sa','Zemlja se zove Ekvador jer leži na ekvatoru.','g5'],
    ['bol','Bolivija','sa','U Boliviji je Salar de Uyuni, ogromna ravnica soli koja posle kiše liči na ogledalo.','g7'],
    ['ury','Urugvaj','sa','Urugvaj je 1930. bio domaćin prvog Svetskog prvenstva u fudbalu, i osvojio ga je.','g11'],

    ['aus','Australija','oc','Koale i veliki crveni kenguri žive u Australiji.','g8'],
    ['nzl','Novi Zeland','oc','Na Novom Zelandu živi ptica kivi koja ne može da leti.','g8'],
    ['wsm','Samoa','oc','Samoa je jedna od zemalja u kojima novi dan počinje među prvima na svetu.'],
    ['ton','Tonga','oc','Tonga je kraljevina sa oko 170 ostrva.'],
    ['plw','Palau','oc','Na Palauu postoji jezero sa milionima meduza čiji je ubod toliko slab da se jedva oseti.']
  ];

  var LIST=C.map(function(c){
    return {id:c[0],name:c[1],cont:c[2],fact:c[3],grp:c[4]||'',amb:!!c[5],draw:F[c[0]]};
  });
  LIST.forEach(function(x){if(!x.draw)throw new Error('Nema crteža za '+x.id)});

  window.FlagData={
    DEFS:DEFS,CONTINENTS:CONTINENTS,LIST:LIST,
    svg:function(id,label,cls){
      var f=LIST.filter(function(x){return x.id===id})[0];
      return '<svg viewBox="0 0 90 60" class="'+(cls||'flag')+'" role="img" aria-label="'+(label||'Zastava')+'" preserveAspectRatio="xMidYMid meet">'+f.draw()+'</svg>';
    }
  };
})();
