require( './style.scss' );
require( '../../../node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css' );

const Vue = require( 'vue' ),
    Ps = require( 'perfect-scrollbar' ),
    component = Vue.extend( {
        template: require( './template.html' ),
        props: {
            messages: {
                type: Array
            },
            users: {
                type: Object
            },
            collapsed: {
                type: Boolean
            }
        },
        components: {
            message: require( '../message' ),
            textbox: require( '../textbox' ),
            toggle: require( '../toggle' )
        },
        ready: function() {
            this.$contentEl = this.$el.querySelectorAll( '.am-chat__content' )[0];
            Ps.initialize( this.$contentEl, {
                wheelSpeed: 2,
                wheelPropagation: true,
                minScrollbarLength: 20
            } );
            this.autoScroll = true;
        },
        methods: {
            scroll: function( e ) {
                if( this.scroll.freeze ) return;
                if( this.autoScrollLock ) return;
                this.autoScroll = this.$contentEl.offsetHeight + this.$contentEl.scrollTop === this.$contentEl.scrollHeight;
                if( this.$contentEl.scrollTop === 0 && this.$contentEl.scrollHeight > this.$contentEl.offsetHeight )
                {
                    this.$dispatch( 'history-prev-request' );
                }
                this.$broadcast( 'scroll' );
            }
        },
        watch: {
            messages: function() {
                if( this.autoScroll )
                {
                    this.autoScrollLock = true;
                    this.$contentEl.scrollTop = this.$contentEl.scrollHeight;
                    this.autoScrollLock = false;
                }

                if( this.scroll.freeze )
                {
                    const intervalId = setInterval( ()=> {
                        this.$contentEl.scrollTop = this.$contentEl.scrollHeight - this.scroll.scrollHeight;
                    }, 1 );
                    setTimeout( ()=> {
                        clearInterval( intervalId );
                        this.$contentEl.scrollTop = this.$contentEl.scrollHeight - this.scroll.scrollHeight;
                        Ps.update( this.$contentEl );
                        this.scroll.freeze = false;
                    }, 10 )
                }
                else
                {
                    Ps.update( this.$contentEl );
                }
            }
        },
        events: {
            popup: function() {
                this.$broadcast( 'popup' );
            },
            'save-scroll-pos': function() {
                this.scroll.freeze = true;
                this.scroll.scrollHeight = this.$contentEl.scrollHeight;
            },
            show: function() {
                this.$contentEl.style.height = '100%';
            },
            hide: function() {
                console.log( 'toggle' );
                this.$contentEl.style.height = 0;
            }
        }
    } );

module.exports = component;