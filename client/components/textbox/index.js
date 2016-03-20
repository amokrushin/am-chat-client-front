require( './style.scss' );
require( '../../../node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css' );

const Vue = require( 'vue' ),
    _ = require( 'lodash' ),
    moment = require( 'moment' ),
    component = Vue.extend( {
        template: require( './template.html' ),
        data: function() {
            return {
                message: {
                    text: ''
                },
                bannedMessage: '',
                bannedTill: 0,
                disabled: true,
                placeholderVisible: true
            }
        },
        methods: {
            sendMessage: function( e ) {
                if( !e.ctrlKey ) return;
                if( _.trim( this.message.text ) )
                {
                    this.$textarea.disabled = true;
                    this.$dispatch( 'send-message', this.message );
                }
            },
            placeholderVisibility: function() {
                this.placeholderVisible = !this.$textarea.value;
            }
        },
        ready: function() {
            this.$textarea = this.$el.querySelectorAll( '.am-chat__textarea' )[0];
            this.$textarea.disabled = true;
        },
        events: {
            reset: function() {
                this.$textarea.disabled = false;
                this.$textarea.value = '';
                this.$textarea.focus();
                this.placeholderVisibility();
            },
            'current-user': function( user ) {
                if( parseInt( user.banned ) )
                {
                    const bannedTill = parseInt( user.bannedTill );
                    this.bannedMessage = 'You are banned ';

                    if( bannedTill === -1 )
                    {
                        this.bannedMessage += 'forever';
                        this.bannedTill = null;
                    }
                    else
                    {
                        this.bannedMessage += 'till';
                        this.bannedTill = bannedTill;
                    }
                }
                else
                {
                    this.$textarea.disabled = false;
                }
            }
        }
    } );

module.exports = component;