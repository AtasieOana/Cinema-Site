window.onload=function(){
	
	var loc=location.href;
	var toate_paginile=document.getElementById("meniu_sus").getElementsByTagName("a");
	for(let i=0;i<toate_paginile.length;i++)
		{
			if(toate_paginile[i]==loc){
				toate_paginile[i].className="curent";
			}
		}
	
	
	// EXAMEN Nivel 1 -> Task 7
	var ravase=["Filmele sunt oglinzi din loc în loc pictate.","Dacă mergi la cineva, ai șanse să fii mai fericit.","Încearcă să îți faci viața ca un film color, nu alb-negru.","Aseamănă-ți viață cu un film.","Iubesc sălile de cinema; filmele de bună calitate îţi pot schimba viaţa cumva... cândva!"]
	var ravas_ales=Math.floor(Math.random()*ravase.length);
	document.getElementById("ravas").innerHTML=ravase[ravas_ales];
	
	var user=prompt("Cum te numesti?");
	var titlu_pagina=document.getElementsByTagName("title")[0].innerHTML;
	if(user){
		document.getElementsByTagName("title")[0].innerHTML= "Salut, "+user+"!";
		setTimeout(function(){document.getElementsByTagName("title")[0].innerHTML=titlu_pagina;}
				   ,2000)
	}
	
}