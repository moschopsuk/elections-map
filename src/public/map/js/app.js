requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '.',
        'jquery': '/js/jquery/jquery-2.0.3',
        'pubsub': './vendors/pubsub',
        'backbone': './vendors/backbone/backbone',
        'underscore': './vendors/backbone/underscore',
        'd3': './vendors/d3/d3.min',
        'socket.io': '/socket.io/socket.io'
    }
});

requirejs(['app/main']);
