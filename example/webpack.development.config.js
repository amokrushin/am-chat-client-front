const Webpack = require( 'webpack' ),
    path = require( 'path' ),
    autoprefixer = require( 'autoprefixer' ),
    BowerWebpackPlugin = require( "bower-webpack-plugin" ),
    bowerRoot = path.resolve( __dirname, 'bower_components' ),
    config = {
        cache: true,

        devtool: 'eval',

        entry: [
            path.resolve( __dirname, '../example/public/script.js' ),
            path.resolve( __dirname, '../node_modules/webpack/hot/dev-server' )
        ],
        output: {
            path: path.resolve( __dirname, '../public/build' ),
            filename: 'bundle.js',
            publicPath: 'http://localhost:3092/build/'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules|bower_components/,
                    loader: "babel-loader",
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.vue$/,
                    exclude: /node_modules|bower_components/,
                    loader: "vue"
                },
                {
                    test: /\.(png|jpg|gif|svg)(\?\S*)?$/,
                    loader: 'url?limit=1000',
                    //include: path.resolve( __dirname, 'client' )
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?\S*)?$/,
                    loader: "url?limit=5000",
                    //include: path.resolve( __dirname, 'client/styles/fonts' )
                },
                {
                    test: /\.css$/,
                    loaders: ['style', 'css', 'postcss']
                },
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'postcss', 'sass']
                },
                {
                    test: /\.html$/,
                    loaders: ['html']
                }
            ]
        },
        postcss: [autoprefixer],

        noParse: [
            path.join( bowerRoot, '/jquery' )
        ],

        plugins: [
            // Bootstrap 4
            new Webpack.optimize.OccurenceOrderPlugin(),
            new Webpack.HotModuleReplacementPlugin(),
            new Webpack.NoErrorsPlugin(),
            new Webpack.ProvidePlugin( {
                $: "jquery",
                jQuery: "jquery"
            } ),
            new BowerWebpackPlugin( {
                modulesDirectories: ["bower_components"],
                manifestFiles: "bower.json",
                includes: /.*/,
                excludes: [],
                searchResolveModulesDirectories: false
            } ),
            new Webpack.ContextReplacementPlugin( /moment[\/\\]locale$/, /ru/ )
        ],

        resolve: {
            modulesDirectories: ['../node_modules', '../client']
        }
    };

module.exports = config;