var http = require('http');
var object;
var picture;

module.exports = function(url,callback)
{	
	http.get(url, function(request) {
		request.setEncoding("utf8");
		request.on("data", function(data) {
				if(data.indexOf('<meta property="og:image" content="')!=-1)
					picture = fill(data,35,'<meta property="og:image" content="');
				  if(data.indexOf('var utag_data') != -1)
				  {
					var type = fill(data,9,' type :');
					var type = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase();
					object = {
						property: {
							url : url,
							prix: parseInt(fill(data,8,'prix :')),
							prix_m_carre : 0,
							localisation: {
								ville: fill(data,8,'city :').replace('_','-'),
								code_postal: fill(data,6,'cp :')
							},
							type_de_bien: type,
							surface: parseInt(fill(data,11,'surface :')),
							nb_piece: parseInt(fill(data,10,'pieces :')),
							ville_titre: fill_ville(data),
							image: picture
						}
					};
				  }
			return callback(object);
		});
	});
}



function fill(data,begin,type_of)
{
	var index = data.indexOf(type_of);
	var filled ="";
	for(var i = begin; data[index+i]!='"'; i++)
	{
		filled = filled.concat(data[index+i])
	}
	return filled;
}

function fill_ville(data)
{
	var ville = fill(data,8,'city :').replace('_',' ');
	ville = ville.charAt(0).toUpperCase() + ville.substring(1).toLowerCase();
	for(var i = 0; i<ville.length;i++)
	{
		if(ville.charAt(i)==' ' || ville.charAt(i)=='-')
			ville = ville.substring(0,i+1) + ville.charAt(i+1).toUpperCase() + ville.substring(i+2).toLowerCase();
	}
	return ville;
}
