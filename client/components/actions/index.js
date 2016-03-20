require( './style.scss' );

const Vue = require( 'vue' ),
    Tether = require( 'tether' ),
    component = Vue.extend( {
        template: require( './template.html' ),
        props: {
            message: {
                type: Object
            }
        },
        data: function() {
            return {
                showMenu: false
            }
        },
        ready: function() {
            //if( !this.adminActions ) return;
            this.$popup = this.$el.querySelectorAll( '.am-chat__menu-popup' )[0];
        },
        methods: {
            contextMenu: function() {
                this.$dispatch( 'popup' );
                //this.popup.position();

                this.popup = new Tether( {
                    element: this.$popup,
                    target: this.$el,
                    attachment: 'top left',
                    targetAttachment: 'bottom left',
                    offset: '-4px 0',
                    constraints: [{
                        to: 'window',
                        attachment: 'together'
                    }]
                } );

                Vue.nextTick( ()=> {this.showMenu = true} );
            },
            closeMenu: function() {
                this.showMenu = false;
                if( this.popup ) this.popup.destroy();
            },
            removeMessage: function() {
                this.$dispatch( 'remove-message', this.message );
                this.closeMenu();
            },
            removeUserMessages: function() {
                this.$dispatch( 'remove-user-messages', this.message.user );
                this.closeMenu();
            },
            banUser: function( duration ) {
                this.$dispatch( 'ban-user', this.message.user, duration );
                this.closeMenu();
            },
            unbanUser: function() {
                this.$dispatch( 'unban-user', this.message.user );
                this.closeMenu();
            }
        },
        events: {
            scroll: function() {
                this.closeMenu();
            },
            popup: function() {
                this.closeMenu();
            }
        }
    } );


module.exports = component;