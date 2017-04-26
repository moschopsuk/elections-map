define([
    'backbone',
    'models/dataFeed'
], function (Backbone, DataFeed) {
    return Backbone.Model.extend({
        defaults: {
            'width': 480,
            'height': 480,
            'center': [240, 240],
            'locatorCenter': [240, 240]
        },
        initialize: function () {
            this.set('initialMaxScaleOut', this.get('maxScaleOut'));
            this.set('dataFeed', new DataFeed({mapModel: this}));
        }
    });
});