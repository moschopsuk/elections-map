define([
  'jquery',
  'backbone',
  'vendors/d3/topojson',
  'data/map.topojson',
  'models/map',
  'views/mapWrapper'
], function (
  $,
  Backbone,
  Topojson,
  mapTopoJson,
  MapModel,
  MapWrapper
) {
  var container = $('.main');
  var mapConfig = {
    'translate': [365, 2377],
    'mapScale': 1993,
    'bounds': [[-300, -400], [775, 575]],
  };

  var Router = Backbone.Router.extend({
     routes: {
       '*default': 'liveUkMap'
     },

     liveUkMap: function() {
        var features = Topojson.feature(mapTopoJson, mapTopoJson.objects['boundaries']).features;
        mapConfig.features = features;
        mapConfig.isLiveUpdating = true;

        var mapModel = new MapModel(mapConfig);
        var mapWrapper = new MapWrapper({mapModel: mapModel});
        container.append(mapWrapper.render());
     }
  });

  var initialize = _.once(function () {
      new Router();
      Backbone.history.start();
  });

  initialize();

});