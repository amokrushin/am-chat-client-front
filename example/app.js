const express = require( 'express' ),
    path = require( 'path' ),
    logger = require( './logger' ),
    app = express();

const appPort = '3091',
    appHost = 'localhost';

console.log( path.resolve( __dirname, 'public' ) );
app.use( '/public', express.static( path.resolve( __dirname, 'public' ) ) );

app.get( '/', function( req, res ) {
    res.sendFile( path.resolve( __dirname, 'index.html' ) );
} );

app.listen( appPort, appHost, function() {
    logger.info( 'Listening on ' + appHost + ':' + appPort );
} );