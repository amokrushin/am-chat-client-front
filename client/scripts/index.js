module.exports = function( options ) {
    const _ = require( 'lodash' ),
        io = require( 'socket.io-client' ),
        Vue = require( 'vue' ),
        socket = io.connect( options.host, {
            'query': 'token=' + options.jwt
        } );

    require( '../styles/index.scss' );

    Vue.config.debug = true;

    options.element.innerHTML = '<chat :messages="messages" :users="users" :collapsed="collapsed"></chat>';

    const currentUser = {},
        peoples = {},
        messages = [],
        app = new Vue( {
            el: options.element,
            data: {
                messages: messages,
                users: peoples,
                connected: false,
                loading: true,
                collapsed: true
            },
            components: {
                chat: require( '../components/chat' )
            },
            events: {
                'send-message': function( msg ) {
                    const message = {
                        user: currentUser,
                        text: msg.text,
                        room: 'public'
                    };
                    socket.emit( 'send-message', message, ( message ) => {
                        onNewMessage( message );
                        this.$broadcast( 'reset' );
                    } );
                },
                'remove-message': function( message ) {
                    socket.emit( 'remove-message', message );
                },
                'remove-user-messages': function( user ) {
                    socket.emit( 'remove-user-messages', 'public', user );
                },
                'ban-user': function( user, duration ) {
                    socket.emit( 'ban-user', user, duration );
                },
                'unban-user': function( user ) {
                    socket.emit( 'unban-user', user );
                },
                'history-prev-request': function() {
                    app.$broadcast( 'save-scroll-pos' );
                    socket.emit( 'history-prev-request', this.messages[0] );
                    socket.once( 'history-response', onHistoryResponse );
                },
                toggle: function() {
                    //this.visible ? app.$broadcast( 'hide' ) : app.$broadcast( 'show' );
                    this.collapsed = !this.collapsed;
                }
            }
        } );

    function extendMessage( message ) {
        return _.assign( {
            id: message.user.id.toString() + message.timestamp,
            self: message.user.id === currentUser.id,
            adminActions: currentUser.isAdmin && message.user.id !== currentUser.id
        }, message );
    }

    function onNewMessage( message ) {
        const index = _.sortedIndexBy( app.messages, message, 'timestamp' );
        app.messages.splice( index, 0, extendMessage( message ) );
        //app.messages.splice( 0, app.messages.length - 50 );
    }

    function onHistoryResponse( messages ) {
        app.messages = _.chain( messages )
            .map( extendMessage )
            .concat( app.messages )
            .uniqBy( 'id' )
            .sortBy( 'timestamp' )
            .value();
    }

    function onHistoryReplace( data ) {
        _.forEach( _.clone( app.messages ), function( message ) {
            if( data.messages && ~data.messages.indexOf( message.id ) )
            {
                message.text = _.noop();
            }
        } );
    }

    socket.on( 'connect', function() {
        app.connected = true;
    } );

    socket.on( 'error', function( error ) {
        if( error.type == "UnauthorizedError" || error.code == "invalid_token" )
        {
            console.error( "User's token has expired" );
        }
    } );

    socket.emit( 'get-self', function( profile ) {
        _.assign( currentUser, profile );
        app.$broadcast( 'current-user', currentUser );
        socket.emit( 'history-request' );
    } );

    socket.on( 'new-user', function( user ) {
        if( !peoples[user.id] )peoples[user.id] = {};
        _.assign( peoples[user.id], user );
    } );

    socket.on( 'new-message', onNewMessage );

    socket.once( 'history-response', onHistoryResponse );

    socket.on( 'history-replace', onHistoryReplace );
};