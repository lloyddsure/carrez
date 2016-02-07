/*global Mustache */
'use strict';

var leboncoin = require('./lib/leboncoin.js');
var lesmeilleursagents = require("./lib/lesmeilleursagents.js"); 

var http = require('http');
var express = require('express');
var app = express();
app.use(express.static('public'));
var hbs = require('hbs');
	
app.get('/home', function(req, res) {
			res.render('home');
	});
app.get('/about', function(req, res) {
			res.render('about');
	});
app.get('/contact', function(req, res) {
			res.render('contact');
	});


app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
	
	
function resultats(object)
{
	
	app.get('/', function(req, res) {
			res.render('result',{title:"Price Comparison", entries:object});
	});
	
	
	app.listen(3000);
}


function home ()
{
	
	app.get('/', function(req, res) {
			res.render('home');
	});
	
	app.listen(3000);
}

var  i =0;


//home();

leboncoin("http://www.leboncoin.fr/ventes_immobilieres/920451315.htm?ca=12_s",function(result){
	if(result != null && i==0)
	{
		i++;
		console.log(result.property.prix_m_carre);
		console.log("https://www.meilleursagents.com/prix-immobilier/"+result.property.localisation.ville+"-"+result.property.localisation.code_postal+"/#estimates");
		lesmeilleursagents(result,'/prix-immobilier/'+result.property.localisation.ville+'-'+result.property.localisation.code_postal+'/#estimates',function(result_lb){
			resultats(result_lb);
		});
	}
});