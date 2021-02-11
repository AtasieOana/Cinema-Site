var adaugat=0;
function act_meniu(e){
	if(adaugat==0)
	{
		/* Adaug un nou  li in meniu pt bookmark */
		meniu=document.getElementById("meniu_sus");
		lista=meniu.getElementsByClassName("menu")[0];
		li=document.createElement("li");
		li.className="p";
		li.innerHTML="BOOKMARK";
		li.style.color="white";
		li.style.backgroundImage = "url('../IMAGINI/bktmenu.jpg')";
		lista.appendChild(li);
		subul=document.createElement("ul");
		subul.id="bookmenu"
		li.appendChild(subul);
		cli=lista.getElementsByClassName("p")
		for(var i=0; i< cli.length;i++)
			cli[i].style.width="16.66%";
		adaugat=1;
	}
	/* Adaug suboptiunile */
	v=document.getElementById("bookmenu");
	subli=document.createElement("li");
	subli.style.color="white";
	subli.style.backgroundImage = "url('../IMAGINI/bktmenu.jpg')";
	subli.innerHTML=e.innerHTML;
	subli.style.overflow="hidden";
	a=document.createElement("a");
	subli.appendChild(a);
	subli.onclick=function(){
		l=Number(e.style.left.replace('px',''));
		t=Number(e.style.top.replace('px',''));
		window.scrollTo(l,t);
	}
	v.appendChild(subli);
}

window.onload=function(){
    var nr_de_ordine=0;
	/* Creez bookmark-urile */
	document.getElementsByTagName("html")[0].onclick=function()
		{  
			body=document.getElementsByTagName("body")[0];
			body.onclick=(function(e){ 		
				if(e.ctrlKey){
					
					div = document.createElement('div');
					div.style.position = "absolute";
					div.style.top = e.pageY + 'px';
					div.style.left = e.pageX + 'px';
					div.style.opacity = '0.5';
					div.innerHTML = 'Bookmark '+nr_de_ordine.toString();
					div.style.backgroundColor="red";
					div.className='bkm';
					document.body.appendChild(div);
					nr_de_ordine++;
					act_meniu(div);
				}
				
			});
		}
	document.getElementsByClassName("bkm").onmousemove=function(){
			console.log("A");
	}
		
}
