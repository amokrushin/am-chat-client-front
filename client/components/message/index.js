require( './style.scss' );

const Vue = require( 'vue' ),
    component = Vue.extend( {
        template: require( './template.html' ),
        props: {
            message: {
                type: Object,
                text: {
                    type: String
                }
            },
            user: {
                type: Object
            }
        },
        computed: {
            cardClass: function() {
                let cardClass = ['am-chat-message'];
                if( this.message.self ) cardClass.push( 'am-chat-message--self' );
                if( !this.message.text ) cardClass.push( 'am-chat-message--removed' );
                return cardClass.join( ' ' );
            }
        },
        filters: {
            time ( timestamp ) {
                const date = new Date( timestamp );
                return date.getHours() + ':' + date.getMinutes();
            },
            escape: require( 'vue-filters/escape' ),
            img ( text ) {
                return text.replace( /(https?:\/\/.*\.(?:jpg|png|gif|jpeg))/ig, "<img src='$1' alt=''>" );
            }
        },
        components: {
            actions: require( '../actions' )
        }
    } );

Vue.use( require( 'vue-moment' ) );

module.exports = component;