var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var formidable=require("formidable");
var session=require("express-session");
var crypto=require("crypto");
var fs=require("fs");
var app = express();
// pentru folosirea ejs-ului 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
	secret:"cheie_sesiune",
	resave: true,
	saveUninitialized:false
}))

//definesc faptul ca folderul resurse e folder static
//adica fisierele din el nu vor fi procesate
console.log("Director curent: "+ __dirname)
app.use(express.static( path.join(__dirname, "resurse")))

//-------------------------------------------------------------

//<form method="post" action="/inreg"
app.post("/inreg", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json");
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "parola_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")
			var userNou={
		  id:obUseri.lastId,
		  username:fields.username,
		  nume:fields.nume,
		  prenume:fields.prenume,
		  email:fields.email,
		  parola:parolaCriptata,
		  dataInreg:new Date(),
		  rol:"user",
		  categorii:fields.categorii
		}
		obUseri.lastId++;
		obUseri.useri.push(userNou);
		var jsonNou=JSON.stringify(obUseri);
		fs.writeFileSync("useri.json", jsonNou);
		res.redirect("/")
	})


	
});


app.post("/login", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json");
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "parola_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")
	
		//find returneaza primul element pentru care functia data ca parametru returneaza true (e indeplinita conditia de cautare)
		//daca nu gaseste un element cu conditia ceruta returneaza null
		var utiliz = obUseri.useri.find(function(el){
			return el.username == fields.username && el.parola == parolaCriptata;
		});

		if(utiliz){
			console.log("exista utilizatorul!")
			req.session.utilizator=utiliz;

			//parametrul al doilea al lui render  contine date de transmis catre ejs
			res.render("html/index", {username: utiliz.username});
		}


	
	})	
});



app.get("/logout", function(req,res){
	req.session.destroy();
	res.redirect("/");
})

app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
		un= req.session? (req.session.utilizator? req.session.utilizator.username: null)  :  null;   
    res.render('html/index',  {username: un});
});

/*
app.get('/promotii', function(req, res) {
	//afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) 
   res.render('html/promotii');
});

app.get('/cont', function(req, res) {
    res.render('html/cont');
});

app.get('/ceva', function(req, res) {
	//afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) 
		console.log("A intrat un student!");
    res.setHeader("Content-Type","text/html");
		x=Math.random()//asta tine loc de procesare
		res.write("<html><body><p>");
		if(x<0.5){
			res.write("Salut!!!");
		}
		else{
			res.write("Pa! Pa!");
		}
		res.write("</p></body></html>");
		res.end();
});
*/

app.get("/*",function(req, res){
	
	//err este null daca randarea s-a terminat cu succes, si contine eroarea in caz contrar (a survenit o eroare)
	//rezRandare - textul in urma randarii (compilarii din ejs in html)
	var un= req.session? (req.session.utilizator? req.session.utilizator.username: null)  :  null; 

	res.render("html"+req.url, {username: un}, function(err, rezRandare){
		if (err){
			if(err.message.includes("Failed to lookup view")){
				res.status(404).render("html/404", {username: un});
			}
			else{
				throw err;
			}
		}
		else{
			res.send(rezRandare);
		}
	});
})


//verificarea pt resursa negasita, trebuie sa fie mereu la final
//if you are here, nu se gaseste ce cauti
app.use(function(req, res) {
	res.status(404).render("html/404");
})

app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');



