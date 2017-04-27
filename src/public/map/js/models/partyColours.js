define([
    'backbone',
    'data/partyColours.json'
], function (Backbone, partyColours) {
    return Backbone.Model.extend({
        defaults: partyColours
    });
});