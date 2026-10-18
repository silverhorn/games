/* Znamenitosti: jednostavni crteži (ručno nacrtani SVG) + grad i zanimljivost. Crtež staje u 120 x 90. */
window.WD=window.WD||{};
(function(){
  function sky(c1,c2){return '<rect width="120" height="90" fill="'+(c1||'#cfe9ff')+'"/>'+(c2?'<rect y="60" width="120" height="30" fill="'+c2+'"/>':'')}
  function r(x,y,w,h,c,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"'+(ex||'')+'/>'}
  function c(x,y,rad,col,ex){return '<circle cx="'+x+'" cy="'+y+'" r="'+rad+'" fill="'+col+'"'+(ex||'')+'/>'}
  function p(pts,col,ex){return '<polygon points="'+pts+'" fill="'+col+'"'+(ex||'')+'/>'}
  function path(d,col,ex){return '<path d="'+d+'" fill="'+col+'"'+(ex||'')+'/>'}
  function ln(x1,y1,x2,y2,col,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="'+w+'" stroke-linecap="round"/>'}
  var sun=c(104,14,8,'#ffe27a');

  var L={};
  L.eiffel=function(){
    var s=sky('#cfe9ff','#8fcf7a')+sun;
    s+=ln(60,4,60,16,'#6b4a35',1.6);
    s+=p('57,16 63,16 65,38 55,38','#7a5b45')+r(51,38,18,3,'#6b4a35');
    s+=p('54.5,41 65.5,41 72,62 48,62','#7a5b45')+r(45,62,30,4,'#6b4a35');
    s+=path('M32,78 L44,66 L76,66 L88,78 L79,78 Q60,52 41,78 Z','#7a5b45');
    s+=ln(57,16,63,38,'#cfae92',.7)+ln(63,16,57,38,'#cfae92',.7)+ln(55,41,66,62,'#cfae92',.7)+ln(65,41,54,62,'#cfae92',.7);
    return s;
  };
  L.colosseum=function(){
    var s=sky('#cfe9ff','#d9c28f')+sun;
    s+=r(10,32,100,44,'#dcbf8f')+p('84,32 110,32 110,50','#cfe9ff');
    s+=r(10,30,100,5,'#c9a56f');
    for(var row=0;row<3;row++){
      for(var i=0;i<9;i++){
        var x=15+i*10.5,y=39+row*12;
        if(row===0&&i>7)continue;
        s+=r(x,y+3,6,9,'#7d5c34')+c(x+3,y+3,3,'#7d5c34');
      }
    }
    s+=r(10,74,100,4,'#c9a56f');
    return s;
  };
  L.bigben=function(){
    var s=sky('#cfe9ff','#8fcf7a')+sun;
    s+=r(6,58,44,20,'#d4b56a')+r(12,48,6,10,'#d4b56a')+p('12,48 18,48 15,40','#6f8294')+r(30,50,5,8,'#d4b56a')+p('30,50 35,50 32.5,43','#6f8294');
    s+=r(70,64,44,14,'#d4b56a');
    for(var i=0;i<8;i++)s+=r(10+i*5,64,2.4,6,'#a88a45');
    s+=r(50,22,20,56,'#c9a45c')+r(48,20,24,4,'#b58f48')+p('50,20 70,20 60,4','#6f8294')+ln(60,4,60,0,'#6f8294',1);
    s+=c(60,34,7.5,'#fffaf0','stroke="#6b5a2e" stroke-width="1.4"')+ln(60,34,60,29,'#333',1.2)+ln(60,34,64,36,'#333',1.2);
    s+=r(55,48,4,10,'#a88a45')+r(61,48,4,10,'#a88a45')+r(55,62,4,10,'#a88a45')+r(61,62,4,10,'#a88a45');
    return s;
  };
  L.liberty=function(){
    var s=sky('#cfe9ff','#6fb0e0')+sun;
    s+=r(44,64,32,14,'#b8b8b8')+r(48,58,24,8,'#a3a3a3');
    s+=p('52,58 68,58 66,36 54,36','#7fc7b0')+c(60,30,5,'#7fc7b0');
    s+=ln(60,25,53,20,'#7fc7b0',1.6)+ln(60,25,56,17,'#7fc7b0',1.6)+ln(60,25,60,15,'#7fc7b0',1.6)+ln(60,25,64,17,'#7fc7b0',1.6)+ln(60,25,67,20,'#7fc7b0',1.6);
    s+=ln(65,38,74,18,'#7fc7b0',4)+p('72.5,18 77,18 76,8 74.5,4 73.5,8','#ffd24a')+r(49,40,6,10,'#6bb59f');
    return s;
  };
  L.pyramids=function(){
    var s=sky('#ffe9b8','#e8c577')+c(24,18,9,'#ffd35a');
    s+=p('4,78 20,58 36,78','#d9ae5a')+p('70,78 90,50 110,78','#d9ae5a')+p('20,78 54,28 88,78','#e8c06a')+p('54,28 88,78 54,78','#cf9f4c');
    s+=p('90,50 110,78 90,78','#c59a48');
    s+=ln(30,66,78,66,'#cf9f4c',.6)+ln(38,54,70,54,'#cf9f4c',.6)+ln(46,42,62,42,'#cf9f4c',.6);
    return s;
  };
  L.tajmahal=function(){
    var s=sky('#ffe3c9','#6fb0e0')+sun;
    s+=r(28,66,64,10,'#f1ece0')+r(44,42,32,24,'#f7f3ea')+path('M44,42 Q60,10 76,42 Z','#fbf8f1');
    s+=ln(60,14,60,6,'#d6b34a',1.4)+path('M56,66 L56,54 Q60,46 64,54 L64,66 Z','#5d6b8a');
    s+=path('M34,66 L34,54 Q37,49 40,54 L40,66 Z','#e0d9c8')+path('M80,66 L80,54 Q83,49 86,54 L86,66 Z','#e0d9c8');
    s+=c(38,50,4,'#fbf8f1')+c(82,50,4,'#fbf8f1');
    s+=r(20,36,4,40,'#f7f3ea')+c(22,35,3,'#fbf8f1')+r(96,36,4,40,'#f7f3ea')+c(98,35,3,'#fbf8f1');
    s+=r(0,76,120,14,'#7fc4ee')+r(54,76,12,14,'#a8dcf5');
    return s;
  };
  L.opera=function(){
    var s=sky('#cfe9ff','#4aa3df')+sun+r(0,74,120,16,'#4aa3df');
    s+=r(8,72,104,5,'#bdbdbd');
    s+=path('M12,72 Q20,38 44,30 Q36,50 40,72 Z','#fdfdfd','stroke="#c9d3dc" stroke-width=".8"');
    s+=path('M38,72 Q46,32 70,24 Q60,48 66,72 Z','#fdfdfd','stroke="#c9d3dc" stroke-width=".8"');
    s+=path('M64,72 Q70,42 92,36 Q84,54 88,72 Z','#fdfdfd','stroke="#c9d3dc" stroke-width=".8"');
    s+=path('M84,72 Q92,52 108,50 Q102,62 104,72 Z','#fdfdfd','stroke="#c9d3dc" stroke-width=".8"');
    return s;
  };
  L.pisa=function(){
    var s=sky('#cfe9ff','#8fcf7a')+sun;
    s+='<g transform="rotate(7 60 78)">'+r(48,16,24,62,'#efe7d3')+r(51,8,18,8,'#e3d9c0');
    for(var i=0;i<6;i++)s+=r(48,22+i*9,24,1.4,'#c8bda1');
    for(var j=0;j<6;j++)for(var k=0;k<4;k++)s+=r(51+k*5.3,24+j*9,2.6,5.5,'#8b7f66');
    s+=p('51,8 69,8 60,0','#9aa7b3')+'</g>';
    s+=r(38,77,50,3,'#7bb866');
    return s;
  };
  L.hramsave=function(){
    var s=sky('#cfe9ff','#8fcf7a')+sun;
    s+=r(26,50,68,28,'#efe6d0')+path('M36,50 Q60,6 84,50 Z','#f7f2e4','stroke="#d9cdb0" stroke-width="1"');
    s+=r(58,4,4,12,'#e0b33a')+r(55,7,10,3,'#e0b33a');
    s+=path('M18,60 Q26,44 34,60 L34,78 L18,78 Z','#efe6d0')+path('M86,60 Q94,44 102,60 L102,78 L86,78 Z','#efe6d0');
    for(var i=0;i<5;i++)s+=path('M'+(40+i*8)+',78 L'+(40+i*8)+',62 Q'+(43+i*8)+',56 '+(46+i*8)+',62 L'+(46+i*8)+',78 Z','#8b7f66');
    s+=r(52,72,16,6,'#a78a5a');
    return s;
  };
  L.christ=function(){
    var s=sky('#cfe9ff')+c(100,14,8,'#ffe27a');
    s+=p('0,90 0,70 36,52 72,60 120,48 120,90','#5fae6b')+p('0,90 0,78 40,66 80,72 120,64 120,90','#4a9b5a');
    s+=r(50,50,20,14,'#bdbdbd')+path('M52,26 L68,26 L70,52 L50,52 Z','#fdfdfd');
    s+=r(20,27,80,6,'#fdfdfd')+c(60,20,5,'#fdfdfd')+r(50,33,20,3,'#e8e8e8');
    return s;
  };
  L.vasilije=function(){
    var s=sky('#cfe9ff','#c8c3bb')+sun;
    s+=r(20,58,80,20,'#d98c5f');
    for(var i=0;i<8;i++)s+=r(26+i*9.4,62,4,8,'#fdf3e6');
    s+=r(52,34,16,26,'#c4493a')+path('M52,34 Q46,22 60,4 Q74,22 68,34 Z','#d94a3a')+path('M60,4 Q56,22 56,34 L58,34 Q58,22 60,4 Z','#f2b134');
    function dome(x,y,w,h,col){return path('M'+x+','+y+' Q'+(x-w*.25)+','+(y-h*.4)+' '+(x+w/2)+','+(y-h)+' Q'+(x+w*1.25)+','+(y-h*.4)+' '+(x+w)+','+y+' Z',col)}
    s+=r(30,44,10,14,'#2f9e72')+dome(28,44,14,16,'#2f9e72')+r(80,44,10,14,'#3b82c4')+dome(78,44,14,16,'#3b82c4');
    s+=r(38,50,8,10,'#f2b134')+dome(36.5,50,11,12,'#f2b134')+r(74,50,8,10,'#e0614f')+dome(72.5,50,11,12,'#e0614f');
    s+=ln(60,4,60,0,'#e0b33a',1.2);
    return s;
  };
  L.burdz=function(){
    var s=sky('#dff1ff','#e8cf9a')+c(100,16,8,'#ffe27a');
    s+=r(10,58,14,20,'#9db8d0')+r(26,50,12,28,'#b7cde0')+r(82,54,14,24,'#9db8d0')+r(98,60,14,18,'#b7cde0');
    s+=path('M50,78 L54,62 L56,46 L57.5,30 L58.5,16 L60,0 L61.5,16 L62.5,30 L64,46 L66,62 L70,78 Z','#7ea3c7');
    s+=path('M60,0 L61.5,16 L62.5,30 L64,46 L66,62 L70,78 L60,78 Z','#6a8fb5');
    [62,46,30,16].forEach(function(y){s+=ln(53+(62-y)*.05,y,67-(62-y)*.05,y,'#dbe9f5',.8)});
    return s;
  };
  L.brandenburg=function(){
    var s=sky('#cfe9ff','#8fcf7a')+sun;
    s+=r(16,28,88,7,'#d8c9a0')+r(20,22,80,6,'#cdbd90');
    for(var i=0;i<6;i++)s+=r(20+i*15.2,35,7,41,'#d8c9a0');
    s+=r(16,76,88,4,'#cdbd90');
    s+=r(52,12,16,10,'#b8a56f')+c(56,10,2.6,'#6b8a5a')+c(64,10,2.6,'#6b8a5a')+r(58,4,4,8,'#b8a56f')+p('55,4 65,4 60,0','#c9b35f');
    return s;
  };
  L.partenon=function(){
    var s=sky('#cfe9ff','#b9a27a')+sun;
    s+=r(12,72,96,6,'#d9cba8')+r(16,68,88,4,'#e5d9bb');
    for(var i=0;i<8;i++)s+=r(20+i*11.8,38,7,30,'#efe3c5')+r(19,36,9,3,'#e0d2ae').replace('x="19"','x="'+(19+i*11.8)+'"');
    s+=r(16,31,88,6,'#e5d9bb')+p('14,31 106,31 60,13','#efe3c5')+p('26,29 94,29 60,17','#d9ccaa');
    return s;
  };
  L.sagrada=function(){
    var s=sky('#cfe9ff','#d9c4a3')+sun;
    s+=r(22,56,76,22,'#d9b98f');
    [[30,30],[44,20],[60,6],[76,20],[90,30]].forEach(function(t){
      s+=r(t[0]-4,t[1],8,56-t[1]+4,'#d9b98f')+p((t[0]-4)+','+t[1]+' '+(t[0]+4)+','+t[1]+' '+t[0]+','+(t[1]-9),'#c89f6a')+c(t[0],t[1]-10,1.4,'#e8d4a8');
      for(var y=t[1]+6;y<54;y+=8)s+=r(t[0]-1.2,y,2.4,4,'#9b7b52');
    });
    for(var i=0;i<5;i++)s+=path('M'+(30+i*12)+',78 L'+(30+i*12)+',64 Q'+(34+i*12)+',58 '+(38+i*12)+',64 L'+(38+i*12)+',78 Z','#9b7b52');
    s+=ln(60,6,60,-2,'#e8d4a8',1.2);
    return s;
  };

  var D=[
    ['eiffel','Ajfelov toranj','Pariz','Francuska','Visok je oko 330 metara. Napravljen je pre više od 130 godina.'],
    ['colosseum','Koloseum','Rim','Italija','Stari rimski stadion. U njemu je moglo da sedi oko 50.000 gledalaca.'],
    ['bigben','Big Ben','London','Velika Britanija','Toranj sa velikim satom pored reke Temze.'],
    ['liberty','Kip slobode','Njujork','SAD','Poklon od Francuske. Drži baklju koja svetli brodovima.'],
    ['pyramids','Piramide u Gizi','Kairo','Egipat','Najveća je Keopsova piramida, stara oko 4500 godina.'],
    ['tajmahal','Tadž Mahal','Agra','Indija','Bela palata od mermera, napravljena iz ljubavi prema supruzi.'],
    ['opera','Opera u Sidneju','Sidnej','Australija','Krov joj liči na jedra brodova.'],
    ['pisa','Krivi toranj','Piza','Italija','Nagnuo se jer je tlo ispod njega meko.'],
    ['hramsave','Hram Svetog Save','Beograd','Srbija','Jedna od najvećih pravoslavnih crkava na svetu.'],
    ['christ','Hristos Spasitelj','Rio de Žaneiro','Brazil','Statua sa raširenim rukama stoji na vrhu planine iznad grada.'],
    ['vasilije','Sabor Vasilija Blaženog','Moskva','Rusija','Zgrada sa šarenim kupolama na Crvenom trgu.'],
    ['burdz','Burdž Kalifa','Dubai','Ujedinjeni Arapski Emirati','Najviša zgrada na svetu, visoka preko 800 metara.'],
    ['brandenburg','Brandenburška kapija','Berlin','Nemačka','Čuvena kapija sa stubovima, simbol Berlina.'],
    ['partenon','Partenon','Atina','Grčka','Hram star preko 2400 godina na brdu Akropolj.'],
    ['sagrada','Sagrada Familija','Barselona','Španija','Crkva koju je smislio Gaudi. Grade je već više od 140 godina.']
  ];
  WD.landmarks=D.map(function(d){
    return {id:d[0],name:d[1],city:d[2],country:d[3],fact:d[4],draw:L[d[0]]};
  });
  WD.landmarks.forEach(function(x){if(!x.draw)throw new Error('Nema crteža '+x.id)});
})();
