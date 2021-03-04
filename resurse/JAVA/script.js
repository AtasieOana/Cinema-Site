var idInterval=-1,tip_film,filme,gen_sters;

function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
}

window.onload=function(){
	var loc=location.href;
	var toate_paginile=document.getElementById("meniu_sus").getElementsByTagName("a");
	for(let i=0;i<toate_paginile.length;i++)
	{
		if(toate_paginile[i]==loc){
			toate_paginile[i].className="curent";
		}
	}
	
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();
	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/JSON/filme.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(obJson) { 
			   
		let div_total=document.getElementById("afisare_template");//contine template-urile

		let interior_template ="";// interior_template va cuprinde interiorul lui div_total
			
		for(let i=0;i<obJson.filme.length;i++){ //se parcurge vetorul de filme din obJson
			//creez un template ejs (primul parametru al lui ejs.render)
			//acesta va primi ca parametru un film din vectorul de filme din json 
			//obJson.filme[i] e redenumit ca "film" in template si putem sa ii accesam proprietatile: film.id etc
				interior_template+=ejs.render("<div class='filme_template'>\
				<p>Id: <span class='id'><%= film.id %></span></p>\
				<p>Numele filmului: <span class='nume'><%= film.nume %></span></p>\
				<p>O mică descriere a filmului: <span class='descriere'><%= film.descriere %></span></p>\
				<p>Durata (în minute): <span class='durata'><%= film.minute %></span></p>\
				<p>Este 3D: <span class='treiD'><%= film.treiD %></span></p>\
				<p>Data rulării: <span class='data'><%= film.lansare %></span></p>\
				<p>Genul filmului: <span class='gen'><%= film.gen %></span></p>\
				</div>", 
				{film: obJson.filme[i]});
			} 
			//adaug textul cu afisarea studentilor in container
			div_total.innerHTML=interior_template;
			filme=Array.prototype.slice.call(document.getElementsByClassName("filme_template"));
			if (gen_sters=localStorage.getItem("gen_stergere"))
				{ 
					stergere()
				}
				else
					gen_sters="";
	}
	
	// Calculare:
	document.getElementById("minim").onclick=function(){
		if(this.innerHTML=="Afișează minimul duratelor")
		{
			minute=document.getElementsByClassName("durata");
			fil=document.getElementsByClassName("nume");
			min=Number(minute[0].innerHTML);
			
			p=0;
			for(let i=1;i<minute.length;i++)
				if(minute[i].innerHTML!="" && Number(minute[i].innerHTML)<min )
					{
						min=Number(minute[i].innerHTML);
						p=i;
					}
			afis=document.createElement("span");
			afis.innerHTML="Cel mai scurt film din punct de vedere al duratei este "+fil[p].innerHTML+" cu o durată de "+min+" minute.";
			afis.style.color="white";
			afis.id="calcul";
			afis.style.marginLeft = "40px";
			afis.style.fontSize = "20px";
			document.getElementById("but").appendChild(afis);	
			this.innerHTML="Ascunde afișarea minimului";
		}
		else
		{
			this.innerHTML="Afișează minimul duratelor";
			document.getElementById("calcul").remove();
		}
	}
	
	// Sortare:
	document.getElementById("sort").onclick=function(){
		
		det_filme=document.getElementsByClassName("filme_template");
		vect_det_filme=Array.prototype.slice.call(det_filme);
		vect_det_filme.sort( function(a,b){
				return a.getElementsByClassName("data")[0].innerHTML.localeCompare(b.getElementsByClassName("data")[0].innerHTML)}
		);
		for(d of vect_det_filme){
			document.getElementById("afisare_template").appendChild(d);
		}
	}
	
	// Filtrare:
	aparitie=0;
	document.getElementById("filt").onclick=function(){
		if(aparitie==0){
			afis=document.createElement("span");
			afis.innerHTML="Apăsați o literă pentru a găsi filmele care încep cu litera respectivă.";
			afis.style.color="white";
			afis.style.marginLeft = "25px";
			document.getElementById("but").appendChild(afis);
			aparitie=1;
			window.onkeypress=function(e){
				tasta=e.key;
				det_filme=document.getElementsByClassName("filme_template");
				for(i=0;i<det_filme.length;i++){
					if(det_filme[i].getElementsByClassName("nume")[0].innerHTML[0]!=e.key.toUpperCase())
						{ 
							det_filme[i].remove();
							i--;
						}
					else {det_filme[i].style.backgroundImage="none";
						  det_filme[i].style.backgroundColor="#2F4F4F";
						  
						}
				}	
			}
		}
	}
	
	// Stergere
	document.getElementById("ls").onclick=function(){
		var gen=document.getElementsByName("sterg");		
		gen_sters="";
		for(let g of gen){
			if(g.checked){
				gen_sters=g.value;
				break;
			}
		}
		stergere();
		localStorage.setItem("gen_stergere",gen_sters);
	}
	
	
	// Cautare
	document.getElementById("c").onclick=function(){
		ce_film=document.getElementById("film_cautat").value
		det_filme=document.getElementsByClassName("filme_template");
		for(i=0;i<det_filme.length;i++){
			if(det_filme[i].getElementsByClassName("nume")[0].innerHTML.search(ce_film)==-1)
				{ 
					
					det_filme[i].remove();
					i--;
				}
		}
	}
	
	// Resetare + setTimeOut
	document.getElementById("res").onclick=function(){
		setTimeout(function(){
			for(i=0;i<filme.length;i++){
				filme[i].style.backgroundImage='url("../IMAGINI/template.jpg")';
				document.getElementById("afisare_template").appendChild(filme[i]);
			}
			localStorage.clear();
			}, 1500)
		
	}	
	
	//setInterval
	document.getElementById("act").onclick=function(){
		
		if(idInterval==-1){
			idInterval=setInterval(function(){
										det_filme=document.getElementsByClassName("filme_template");
										for(let i=0;i<det_filme.length;i++)
											det_filme[i].getElementsByClassName("data")[0].innerHTML=randomDate(new Date(2020, 0,3), new Date())
										}
								,1500);
		}
	}
	
	
	document.getElementById("o_act").onclick=function(){
		clearInterval(idInterval);
		idInterval=-1;
	}
	
	// TASK EXAMEN -> Nivel 4 Ex.3
	document.getElementById("sort_task1").onclick=function(){
		
		det_filme=document.getElementsByClassName("filme_template");
		vect_det_filme=Array.prototype.slice.call(det_filme); 
		vect_det_filme.sort( function(a,b){
				if(a.getElementsByClassName("treiD")[0].innerHTML=="nu" && b.getElementsByClassName("treiD")[0].innerHTML=="da")
					return -1;
				
				if(a.getElementsByClassName("treiD")[0].innerHTML=="da" && b.getElementsByClassName("treiD")[0].innerHTML=="nu")
					return 1;
	
				if(a.getElementsByClassName("data")[0].innerHTML.localeCompare(b.getElementsByClassName("data")[0].innerHTML)==1)
					return 1;

				if(a.getElementsByClassName("data")[0].innerHTML.localeCompare(b.getElementsByClassName("data")[0].innerHTML)==-1)
					return -1;
				
				return a.getElementsByClassName("nume")[0].innerHTML.localeCompare(b.getElementsByClassName("nume")[0].innerHTML);
			}
		);
		for(d of vect_det_filme){
			document.getElementById("afisare_template").appendChild(d);
		}
	}
	
	document.getElementById("sort_task2").onclick=function(){
		
		det_filme=document.getElementsByClassName("filme_template");
		vect_det_filme=Array.prototype.slice.call(det_filme); 
		vect_det_filme.sort( function(a,b){
				return a.getElementsByClassName("gen")[0].innerHTML.split(",").length - b.getElementsByClassName("gen")[0].innerHTML.split(",").length;
			}
		);
		for(d of vect_det_filme){
			document.getElementById("afisare_template").appendChild(d);
		}
	}
	
	document.getElementById("sort_task3").onclick=function(){
		
		det_filme=document.getElementsByClassName("filme_template");
		for(let i=0;i<det_filme.length;i++)
		{   
			id=det_filme[i].getElementsByClassName("id")[0].innerHTML;
			nume=det_filme[i].getElementsByClassName("nume")[0].innerHTML;
			desc=det_filme[i].getElementsByClassName("descriere")[0].innerHTML;
			durata=det_filme[i].getElementsByClassName("durata")[0].innerHTML;
			treiD=det_filme[i].getElementsByClassName("treiD")[0].innerHTML;
			data=det_filme[i].getElementsByClassName("data")[0].innerHTML;
			gen=det_filme[i].getElementsByClassName("gen")[0].innerHTML;
			if(id=="" || nume=="" || desc=="" || durata=="" || treiD=="" || data=="" || gen==""){
				det_filme[i].remove();
				i--;
			}	
		}
	}
}


function stergere()
{
	det_filme=document.getElementsByClassName("filme_template");
	for(i=0;i<det_filme.length;i++){
		if(det_filme[i].getElementsByClassName("gen")[0].innerHTML.search(gen_sters)!=-1)
		{ 		
			det_filme[i].remove();
			i--;
		}
	}
}
