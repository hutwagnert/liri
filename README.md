# liri
This is an app to use node.js to search for movies, songs and band events
You can search via
		"Please ensure you have npm installed : node-spotify-api , omdb-client, dotenv, bandsintown, request" +'\n'+
		" To search a song type: node liri.js spotify-this-song 'Song title'" + '\n'+
		" To search for an event type: node liri.js find-event" + '\n'+
		"To search a movie type: node liri.js movie-this 'Movie Title'" +'\n'+
		"To search via randomtxt file type: node liri.js do-what-it-says" +'\n'


You can change random text and it should search.
.env file should look like
~
#Spotify API keys
SPOTIFY_ID=XXX
SPOTIFY_SECRET=XXX

#OMDB API key
OMDB_API =XXX

#BAND API
BAND_API =XXX
~

I never got the Bands in Town App Id working correctly. So it is in the liri.js file