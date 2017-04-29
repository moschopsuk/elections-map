define([
    'backbone',
    'pubsub'
], function (Backbone, pubsub) {
    return Backbone.Model.extend({
        url: function () {
            return 'http://localhost:3000/api/results'
        },
        initialize: function (options) {
            var _this = this;
            this.mapModel = options.mapModel;
            this.fetch().done(function () {
                pubsub.publish('map:hasData');
            });
        }
    });
});
