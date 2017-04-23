requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '.',
        'jquery': './vendors/jquery/jquery-2.0.3',
        'backbone': './vendors/backbone/backbone',
        'underscore': './vendors/backbone/underscore',
        'd3': 'lib/vendors/d3/d3.min'
    }
});

requirejs(['app/main']);
