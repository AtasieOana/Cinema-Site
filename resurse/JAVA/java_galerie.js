window.onload=function(){

	var loc=location.href;
	var toate_paginile=document.getElementById("meniu_sus").getElementsByTagName("a");
	for(let i=0;i<toate_paginile.length;i++)
	{
		if(toate_paginile[i]==loc){
			toate_paginile[i].className="curent";
		}
	}
	
	// EXAMEN Nivel 1 -> Task 8
	document.getElementById("imag").onclick=function(){
		var imagini=document.getElementsByTagName("img");
		if(this.innerHTML=="Ascunde imagini"){
			for(let i=0;i<imagini.length;i++)
				imagini[i].style.display="none";
			this.innerHTML="Afișează imagini";
			
		}
		else
		{	
			for(let i=0;i<imagini.length;i++)
				imagini[i].style.display="inline-block";
			this.innerHTML="Ascunde imagini";
			
		}
	}
	
	var user=prompt("Cum te numesti?");
	var titlu_pagina=document.getElementsByTagName("title")[0].innerHTML;
	
	if(user){
		document.getElementsByTagName("title")[0].innerHTML= "Salut, "+user+"!";
		setTimeout(function(){document.getElementsByTagName("title")[0].innerHTML=titlu_pagina;}
				   ,2000)
	}
}