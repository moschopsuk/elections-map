define([
    'backbone',
    'd3',
    'pubsub',
], function (Backbone, d3, pubsub) {
    return Backbone.View.extend({
        className: 'main-map--container',
        initialize: function (options) {
            this.mapModel = options.mapModel;
            this.dataFeed = this.mapModel.get('dataFeed');
            this.partyColours = this.mapModel.get('partyColours');
            this.features = this.mapModel.get('features');
            this.width = this.mapModel.get('width');
            this.height = this.mapModel.get('height');
            this.d3El = d3.select(this.el);
            this.initMap();

            pubsub.subscribe('map:hasData', this.updateResults.bind(this));
        },

        initMap: function () {
            this.initScale = this.mapModel.get('maxScaleOut');
            this.bounds = this.mapModel.get('bounds');

            this.projection = d3.geo.mercator()
                .scale(this.mapModel.get('mapScale'))
                .translate(this.mapModel.get('translate'));

            this.path = d3.geo.path()
                .projection(this.projection);

            this.zoom = d3.behavior.zoom()
                    .scaleExtent([this.mapModel.get('maxScaleOut'), this.mapModel.get('maxScaleIn')])

            this.svg = d3.select(this.el)
                .append('svg')
                .attr('class', 'main-map--svg')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', '0 0 ' + this.width + ' ' + this.height);

            this.group = this.svg.append('g');
        },

        updateResults: function() {
            var _this = this;
            d3.selectAll('.constituency-path')
            .style('fill', function (d) {
                    var constituencyInfo = _this.dataFeed.get(d.properties.constituency_gssid);
                    if (constituencyInfo && constituencyInfo.winningPartyCode) {
                        return _this.partyColours.get(constituencyInfo.winningPartyCode);
                    } else {
                        return _this.partyColours.get('OTH');
                    }
                })
        },

        render: function () {
            var _this = this;
            
            this.group
                .selectAll('path')
                .data(this.features)
                .enter().append('path')
                .attr('class', function (d) {
                    return 'constituency-path';
                })
                .attr('d', this.path);

            this.svg
                .call(this.zoom)
                .call(this.zoom.event)

            console.log('render');

            this.positionMap();
            return this.$el;
        },

        positionMap: function () {
            var centroid = this.mapModel.get('center'),
                scale = this.mapModel.get('scale'),
                translation;

            translation = this.getTranslationFromCentroid(centroid, scale);

            if (translation && scale) {
                var boundedValues = this.applyScaleBounds(translation, scale, scale);
                translation = boundedValues.translation;
                scale = boundedValues.scale;
                this.setTranslationAndScale(translation, scale);
            }
        },

        getTranslationFromCentroid: function (centroid, scale) {
            return [((this.width / 2) - (centroid[0] * scale)), ((this.height / 2) - (centroid[1] * scale))];
        },

        applyScaleBounds: function (translation, scale, previousScale) {
            var maxScaleOut = this.mapModel.get('maxScaleOut'),
                maxScaleIn = this.mapModel.get('maxScaleIn'),
                center = [this.width / 2, this.height / 2],
                scaleFactor = scale / previousScale;

            if (scale < maxScaleOut || scale > maxScaleIn) {
                scale = (scale < maxScaleOut) ? maxScaleOut : maxScaleIn;
                scaleFactor = scale / previousScale;
            }

            translation[0] = (translation[0] - center[0]) * scaleFactor + center[0];
            translation[1] = (translation[1] - center[1]) * scaleFactor + center[1];

            return {
                translation: translation,
                scale: scale
            };
        },

        setTranslationAndScale: function (translation, scale, animated, callback) {
            var group = (animated) ? this.group.transition().duration(1000) : this.group;
            group.attr('transform', 'translate(' + translation[0] + ',' + translation[1] + ') scale(' + scale + ')');
            if (animated) {
                group.each('end', callback);
            }

            if (this.isInteractive) {
                this.zoom.translate([translation[0], translation[1]]).scale(scale);
            }
            this.scale = scale;
            this.translation = translation;
        },
    });
});