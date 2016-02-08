var http = require('http');
var prix_surface;

module.exports = function(object,url,callback)
{
	var option = { 
		hostname : 'www.meilleursagents.com',
		path : url,
		port : 80,
		headers:{
		'Cookie' : 'session=eyJ1c2VyX2lkIjoxMzgzMjcwLCJhbmFseXRpY3NfdGFncyI6W10sIl9mcmVzaCI6ZmFsc2UsIl9pZCI6IjVkMmJhYzViNDYwNzIzYjIyY2ExODMwYjNiMTM5YWQ0In0.CZI9QA.xU--fOh8HHucgiQUrRsbuC4oswU'
	}
	}
	http.get(option, function(request) {
		request.setEncoding("utf8");
		request.on("data", function(data) {
			if(object.property.type_de_bien=='Appartement')
			{
				if(data.indexOf('Prix m2 appartement :') != -1)
				{
					return callback(object, fill(data,22,'Prix m2 appartement :'));
				}
			}
			else if(object.property.type_de_bien=='Maison')
			{
				if(data.indexOf('Prix m2 maison :') != -1)
				{
					console.log(fill(data,16,'Prix m2 maison :'));
					return callback(object,fill(data,18,'Prix m2 maison :'));
				}
			}
		});
	});
}


function fill(data,begin,type_of)
{
	var index = data.indexOf(type_of);
	var filled ="";
	for(var i = begin; data[index+i]!=' '; i++)
	{
		filled = filled.concat(data[index+i])
	}
	return filled;
}