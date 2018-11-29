
//need to get dotenv working
var dotenv = require("dotenv").config();
var keys = require('./keys')
var Spotify = require('node-spotify-api');
var request = require('request');
var omdbApi = require('omdb-client');
var fs = require('fs');
//spotify keys
// var spotify = new Spotify ({
//     id:'6b8b32bdadc742c4bd12207882ddfebf',
//     secret:'677a834def3147ebb59552a5916872c6'
// });
var apikeyOMDB = keys.omdb;
var spotify =  new Spotify(keys.spotify);
// function nono (){
// 	console.log(spotify);
// 	console.log(yyy);
// }

// console.log(apikeyOMDB);
//var keys = require('./keys');
//need to get this working


// args
var argComein = process.argv;
var comLiri = argComein[2];


var liriArg = '';
for (var i = 3; i < argComein.length; i++) {
	liriArg += argComein[i] + ' ';
}
if (comLiri === `spotify-this-song`) {
	songFinder(liriArg);

} else if (comLiri === `movie-this`) {
	omdbFinder(liriArg);
} else if (comLiri === `do-what-it-says`) {
	dowhatitsays();
}else {
	console.log(
		"Please ensure you have npm installed : node-spotify-api , omdb-client, dotenv " +'\n'+
		" To search a song type: node liri.js spotify-this-song 'Song title'" + '\n'+
		"To search a movie type: node liri.js movie-this 'Movie Title'" +'\n'+
		"To search via randomtxt file type: node liri.js do-what-it-says" +'\n'

	)
}


// songFinder will retrieve information on a song from Spotify
function songFinder(songto) {

	// setsonger
	var searchSong;
	if (songto === '') {
		searchSong = 'The Sign Ace Of Base';
	} else {
		searchSong = songto;
	}
    spotify.search ({ type: 'track', query: searchSong }, function(error, data) {
        if (error) {
			var errorStr1 = 'Error' + error;
			console.log(errorStr1);
			return;
	    } else {
			var songInfo = data.tracks.items[0];
			if (!songInfo) {
				var errorStr2 = 'Error we couldnt find that song ensure you spelled it right or try a new one';
				console.log(errorStr2);
				return;
			} else {
				
				var outputStr = '------------------------\n' + 
								'Song Information:\n' + 
								'------------------------\n\n' + 
								'Song Name: ' + songInfo.name + '\n'+ 
								'Artist: ' + songInfo.artists[0].name + '\n' + 
								'Album: ' + songInfo.album.name + '\n' + 
								'Preview Here: ' + songInfo.preview_url + '\n';
				console.log(outputStr);
			}
	    }
      });
	}

// ombd
function omdbFinder(movie) {

	// no movie
	var movieSearch;
	if (movie === '') {
		movieSearch = 'Mr. Nobody';
	} else {
		movieSearch = movie;
	}
	
	var params = {
		apiKey: apikeyOMDB,
		title: movieSearch
	}
	omdbApi.get(params, function(err,data) {
console.log(data);
if(err != null){
	console.log("Error" + err);
}else if(data.Title === null){
	console.log("try a new movie we couldnt find that one")
}
else {
	console.log(
		'------------------------\n' + 
								'Movie Information:\n' + 
								'------------------------\n\n' +
								'Movie Title: ' + data.Title + '\n' + 
								'Year Released: ' + data.Released + '\n' +
								'IMBD Rating: ' + data.imdbRating + '\n' +
								'Country Produced: ' + data.Country + '\n' +
								'Language: ' + data.Language + '\n' +
								'Plot: ' + data.Plot + '\n' +
								'Actors: ' + data.Actors + '\n' + 
								'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
								'Rotten Tomatoes URL: ' + data.tomatoURL + '\n'
			
	)
}

	});

}
function dowhatitsays(){
	fs.readFile('./random.txt', 'utf8', function (err, data) {
		if (err) {
			console.log('Error' + err);
			return;
		} else {
			var cmdString = data.split(',');
			var command = cmdString[0].trim();
			var param = cmdString[1].trim();

			switch(command) {
				case 'spotify-this-song':
					songFinder(param);
					break;

				case 'movie-this':
					omdbFinder(param);
					break;
			}
		}
	});
	
}

 

