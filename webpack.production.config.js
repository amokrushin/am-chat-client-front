const Webpack = require( 'webpack' ),
    path = require( 'path' ),
    autoprefixer = require( 'autoprefixer' ),
    BowerWebpackPlugin = require( "bower-webpack-plugin" ),
    CleanWebpackPlugin = require( 'clean-webpack-plugin' ),
    ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

var config = {
    entry: [
        'bootstrap-loader/extractStyles',
        './client/scripts/export-global.js'
    ],
    output: {
        path: path.join( __dirname, 'public', 'build' ),
        filename: 'bundle.js',
        publicPath: '/build/'
    },

    module: {
        loaders: require( './example/webpack.development.config' ).module.loaders
    },

    postcss: [autoprefixer],

    plugins: [
        new ExtractTextPlugin( 'bundle.css', {allChunks: true} ),
        // Bootstrap 4
        //new Webpack.optimize.OccurenceOrderPlugin(),
        //new Webpack.NoErrorsPlugin(),
        new Webpack.ProvidePlugin( {
            $: "jquery",
            jQuery: "jquery"
            //'window.Tether': "tether"
        } ),
        new BowerWebpackPlugin( {
            modulesDirectories: ["bower_components"],
            manifestFiles: "bower.json",
            includes: /.*/,
            excludes: [],
            searchResolveModulesDirectories: false
        } ),
        new CleanWebpackPlugin( ['public/build'], {
            root: __dirname,
            verbose: true,
            dry: false
        } ),
        new Webpack.ContextReplacementPlugin( /moment[\/\\]locale$/, /ru/ )
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'client']
    }
};

module.exports = config;