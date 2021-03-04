window.onload=function(){
	
	var loc=location.href;
	var toate_paginile=document.getElementById("meniu_sus").getElementsByTagName("a");
	for(let i=0;i<toate_paginile.length;i++)
		{
			if(toate_paginile[i]==loc){
				toate_paginile[i].className="curent";
			}
		}
	
	document.getElementById("blu").onclick=function(){
		document.getElementById("luni").style.display="block";
		document.getElementById("marti").style.display="none";
		document.getElementById("joi").style.display="none";
		document.getElementById("vineri").style.display="none";
		document.getElementById("sambata").style.display="none";
		document.getElementById("duminica").style.display="none";
	}
	
	document.getElementById("bma").onclick=function(){
		document.getElementById("luni").style.display="none";
		document.getElementById("marti").style.display="block";
		document.getElementById("miercuri").style.display="none";
		document.getElementById("joi").style.display="none";
		document.getElementById("vineri").style.display="none";
		document.getElementById("sambata").style.display="none";
		document.getElementById("duminica").style.display="none";
	}
	
	document.getElementById("bmi").onclick=function(){
		document.getElementById("luni").style.display="none";
		document.getElementById("marti").style.display="none";
		document.getElementById("miercuri").style.display="block";
		document.getElementById("joi").style.display="none";
		document.getElementById("vineri").style.display="none";
		document.getElementById("sambata").style.display="none";
		document.getElementById("duminica").style.display="none";
	}
	
	document.getElementById("bjo").onclick=function(){
		document.getElementById("luni").style.display="none";
		document.getElementById("marti").style.display="none";
		document.getElementById("miercuri").style.display="none";
		document.getElementById("joi").style.display="block";
		document.getElementById("vineri").style.display="none";
		document.getElementById("sambata").style.display="none";
		document.getElementById("duminica").style.display="none";
	}
	document.getElementById("bvi").onclick=function(){
		document.getElementById("luni").style.display="none";
		document.getElementById("marti").style.display="none";
		document.getElementById("miercuri").style.display="none";
		document.getElementById("joi").style.display="none";
		document.getElementById("vineri").style.display="block";
		document.getElementById("sambata").style.display="none";
		document.getElementById("duminica").style.display="none";
	}
	document.getElementById("bsa").onclick=function(){
		document.getElementById("luni").style.display="none";
		document.getElementById("marti").style.display="none";
		document.getElementById("miercuri").style.display="none";
		document.getElementById("joi").style.display="none";
		document.getElementById("vineri").style.display="none";
		document.getElementById("sambata").style.display="block";
		document.getElementById("duminica").style.display="none";
	}
	document.getElementById("bdu").onclick=function(){
		document.getElementById("luni").style.display="none";
		document.getElementById("marti").style.display="none";
		document.getElementById("miercuri").style.display="none";
		document.getElementById("joi").style.display="none";
		document.getElementById("vineri").style.display="none";
		document.getElementById("sambata").style.display="none";
		document.getElementById("duminica").style.display="block";
	}
	
	
	/// TASK EXAMEN: NIVEL 3 TASK 15
	
	document.addEventListener("contextmenu", function(e){ e.preventDefault(); });
	
	document.onmousedown = function(e)
	{
		if(e.button == 2)
		{	
			div_cu_butoane=document.getElementById("butoane_meniu");
			div_cu_butoane.style.display = "block";
			div_cu_butoane.style.position = "absolute";
			div_cu_butoane.style.top = e.pageY + 'px';
			div_cu_butoane.style.left = e.pageX + 'px';
			b1=document.getElementById("b1");
			b2=document.getElementById("b2");
			b3=document.getElementById("b3");
			b1.onclick=function(){
				location.href = "/";
			}
			b2.onclick=function(){
				raspuns=prompt("Film?");
				filme=document.getElementsByClassName("progf");
				for(let i=0;i<filme.length;i++)
					if(filme[i].getElementsByTagName("a")[0].innerHTML.search(raspuns)!=-1)
					{
						filme[i].style.background="black";
						filme[i].style.border = "thick solid white";
						filme[i].style.paddingTop = "10px";
					}
			}	
			b3.onclick=function(){
				filme=document.getElementsByClassName("progf");
				for(let i=0;i<filme.length;i++)
					{	
						if(filme[i].style.background=="black"){
							filme[i].style.background="inherit";
							filme[i].style.border = "none";
							filme[i].style.paddingTop = "0px";
						}
					}
			}
		}
			
		if(e.button == 0 || e.button ==1)
		{
			if(document.getElementById('butoane_meniu').contains(e.target)==false)
				if(document.getElementById("butoane_meniu").style.display=="block"){
					document.getElementById("butoane_meniu").style.display="none";
			}
		}
	}
}
