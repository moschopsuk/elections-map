define([
    'backbone',
    'models/dataFeed',
    'models/partyColours'
], function (Backbone, DataFeed, PartyColours) {
    return Backbone.Model.extend({
        defaults: {
            'width': 1080,
            'height': 1920,
            'translate': [140, 150],
            'scale': 3,
            'maxScaleOut': 1,
            'maxScaleIn': 40,
            'center': [250, 107],
        },
        initialize: function () {
            this.set('dataFeed', new DataFeed({mapModel: this}));
            this.set('partyColours', new PartyColours());
        }
    });
});