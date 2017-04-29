define([
    'backbone',
    'pubsub',
    'socket.io',
], function (Backbone, pubsub, io) {
    return Backbone.Model.extend({
        url: function () {
            return 'http://localhost:3000/api/results'
        },
        initialize: function (options) {
            this.on('change', this.notify, this);
            var _this = this;
            this.mapModel = options.mapModel;
            this.fetch();

            var socket = io.connect('http://localhost:3000');
            socket.on('api:staleData', function() {
                _this.fetch();
            });
        },
        notify: function() {
            pubsub.publish('map:hasData');
        },
    });
});
