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
  var container = $('.map');
  var mapConfig = {
    'width': 480,
    'height': 538,
    'center': [240, 269],
    'locatorCenter': [240, 269],
    'mapScale': 1800,
    'maxScaleOut': 1,
    'maxScaleIn': 30,
    'lonLatCenter': [-2.265, 54.4],
    'bounds': [[-20, 66], [10, 43]],
    'translate': [290, 265]
  };

  var Router = Backbone.Router.extend({
     routes: {
       '*default': 'liveUkMap'
     },

     liveUkMap: function() {
        var features = Topojson.feature(mapTopoJson, mapTopoJson.objects['boundaries']).features;
        mapConfig.features = features;
        mapConfig.isLiveUpdating = true;

        var mapModel = new MapModel(config);
        var mapWrapper = new MapWrapper({mapModel: mapModel});
        container.append(mapWrapper.render());
     }
  });

  var initialize = _.once(function () {
      new Router();
      Backbone.history.start();
  })();

});