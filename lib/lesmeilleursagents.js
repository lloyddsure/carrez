var https = require('https');
var prix_surface;

module.exports = function(object,url,callback)
{
	var options = { 
		hostname : 'www.meilleursagents.com',
		path : url,
		port : 443,
		headers:{
		'Cookie' : 'session=eyJfZnJlc2giOmZhbHNlLCJfaWQiOiJiNTk0YThkYWNhYzExNTNiMzBjYzE1ZWE5YTI5ZGNjNiIsImFuYWx5dGljc190YWdzIjpbXSwidXNlcl9pZCI6MTM4MzMxNn0'
	}
	}
	console.log(options.hostname+options.path);
	/*https.get(options, function(request) {
		request.setEncoding("utf8");
		request.on("data", function(data) {
			if(object.property.type_de_bien=='Appartement')
			{
				if(data.indexOf('Prix m2 appartement :') != -1)
				{
					console.log(2222);
					object.property.prix_m_carre = fill(data,22,'Prix m2 appartement :');
					return callback(object);
				}
			}
			else
			{
				if(data.indexOf('Prix m2 maison :') != -1)
				{
					object.property.prix_m_carre = fill(data,18,'Prix m2 maison :');
					return callback(object);
				}
			}
		});
	});*/
	console.log(object.property.prix_m_carre);
		return callback(object);
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