define([
    'backbone',
    'views/map',
], function (Backbone, MapView) {
    return Backbone.View.extend({
        className: 'map-wrapper',
        initialize: function (options) {
            this.container = options.container;
            this.mapModel = options.mapModel;
        },
        render: function () {
            this.$el.append(this.getMap());
            return this.$el;
        },
        getMap: function () {
            return new MapView({mapModel: this.mapModel}).render();
        }
    });
});
