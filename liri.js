
//need to get dotenv working
//require("dotenv").config();

var Spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');
var fs = require('fs');
//spotify keys
var spotify = new Spotify ({
    id:'6b8b32bdadc742c4bd12207882ddfebf',
    secret:'677a834def3147ebb59552a5916872c6'
});


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
	retrieveOBDBInfo(liriArg);}

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
				var errorStr2 = 'Error';
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
function retrieveOBDBInfo(movie) {

	// no movie
	var movieSearch;
	if (movie === '') {
		movieSearch = 'Mr. Nobody';
	} else {
		movieSearch = movie;
	}
	movieSearch = search.split(' ').join('+');

	var queryStr = 'http://www.omdbapi.com/?t=' + movieSearch + '&plot=full&tomatoes=true';
	request(queryStr, function (error, response, body) {
		if ( error || (response.statusCode !== 200) ) {
			var errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

			// Append the error string to the log file
			fs.appendFile('./log.txt', errorStr1, (err) => {
				if (err) throw err;
				console.log(errorStr1);
			});
			return;
		} else {
			var data = JSON.parse(body);
			if (!data.Title && !data.Released && !data.imdbRating) {
				var errorStr2 = 'ERROR: No movie info retrieved, please check the spelling of the movie name!';

				// Append the error string to the log file
				fs.appendFile('./log.txt', errorStr2, (err) => {
					if (err) throw err;
					console.log(errorStr2);
				});
				return;
			} else {
		    	// Pretty print the movie information
		    	var outputStr = '------------------------\n' + 
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
								'Rotten Tomatoes URL: ' + data.tomatoURL + '\n';


			}
		}
	});


}



 

