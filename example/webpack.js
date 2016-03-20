'use strict';

const webpack = require( 'webpack' ),
    path = require( 'path' ),
    WebpackDevServer = require( 'webpack-dev-server' ),
    logger = require( './logger' ),
    webpackConfig = require( './webpack.development.config' );

const proxyPort = '3092',
    proxyHost = 'localhost',
    appPort = '3091',
    appHost = 'localhost';

logger.info( 'Listening on ' + proxyHost + ':' + proxyPort );

const compiler = webpack( webpackConfig ),
    frontServer = new WebpackDevServer( compiler, {
        contentBase: path.resolve( __dirname, '../client' ),
        hot: true,
        noInfo: true,
        quiet: false,
        stats: {
            colors: true
        },
        publicPath: webpackConfig.output.publicPath,
        proxy: {
            "*": 'http://' + appHost + ':' + appPort
        }
    } );

compiler.plugin( 'done', function( stats ) {
    logger.info( 'webpack compiler', (stats.endTime - stats.startTime) + 'ms' );
} );

frontServer.listen( proxyPort, proxyHost, function() {
    logger.info( 'Bundling project, please wait...' );
} );

process.once( 'SIGINT', function() {
    frontServer.close();
    setTimeout( function() {
        process.exit( 1 );
    }, 1000 );
} );