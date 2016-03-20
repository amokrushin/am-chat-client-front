require( './style.scss' );

const Vue = require( 'vue' ),
    component = Vue.extend( {
        template: require( './template.html' ),
        props: {},
        data: function() {
            return {}
        },
        ready: function() {
        },
        methods: {
            toggle: function() {
                this.$dispatch( 'toggle' );
            }
        },
        events: {}
    } );


module.exports = component;