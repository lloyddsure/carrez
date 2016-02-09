/*global Mustache */
'use strict';

var leboncoin = require('./lib/leboncoin.js');
var lesmeilleursagents = require("./lib/lesmeilleursagents.js"); 
var  i =0;



var http = require('http');
var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

	

	
	
function resultats(object,prix_m_carre)
{
	var app = express();
	app.use(express.static('public'));
		
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
	object.property.prix_m_carre = parseInt(prix_m_carre);
	app.get('/', function(req, res) {
		object.property.estimation = object.property.surface * prix_m_carre;
			res.render('result',{title:"Price Comparison", entries:object});
	});
	app.listen(3001);
}


function home ()
{
	
		// Chargement du fichier index.html affiché au client
	var server = http.createServer(function(req, res) {
		fs.readFile('./views/home.html', 'utf-8', function(error, content) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);
		});
	});

	// Chargement de socket.io
	var io = require('socket.io').listen(server);


	io.sockets.on('connection', function (socket) {   
		socket.on('message', function (message) {
			i=0;
			leboncoin(message,function(result){
				if(result != null && i==0)
				{
					i++;
					lesmeilleursagents(result,'/prix-immobilier/'+result.property.localisation.ville+'-'+result.property.localisation.code_postal+'/#estimates',function(result_lb,prix){
						resultats(result_lb,prix);
					});
				}
			});
		});	
	});

	server.listen(3000);
}




home();
