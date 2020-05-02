import LineChartHelper from './LineChartHelper';
const MAP_GEODATA_CONFIG_COUNTRIES = require("./config/countries");
const MAP_SERIES_ID_COUNTRY = "COUNTRY";
const MAP_SERIES_ID_WORLD = "WORLD";
const MAP_SERIES_ID_BUBBLE_SUFFIX = "BUBBLE";
const MAP_GEODATA_BASE_URL = "https://www.amcharts.com/lib/4/geodata/json";
const MAP_BUBBLES_COLOR = "#8aabb0";
const LOG_MESSAGE_TEMPLATES = {
        "COUNTRY_SERIES_NOT_FOUND": "country series not found",
        "POLYGON_NOT_FOUND": "polygon not found",
        "UNKNOWN_MAP": "unknown map",
        "COUNTRY_LINE_CHART_NOT_FOUND": "country line chart not found"
};
export default class MapChartHelper
{
        static renderMap(aMapChart)
        {
                this._prepareMap(aMapChart);
        }
        static onHomeSelected(aMapChart)
        {
                this._setWorldVisibility(aMapChart, true);
                aMapChart.goHome();
        }
        static onCountrySelected(aEvent)
        {
                this._zoomIn(aEvent);
                const oTarget = aEvent.target;
                const sCountryId = oTarget.dataItem.dataContext.id;
                const oCountryConfig = MAP_GEODATA_CONFIG_COUNTRIES[sCountryId];
                const sMapName = oCountryConfig && oCountryConfig[0];
                if (sMapName)
                {
                        oTarget.isHover = false;
                        const oMapChart = oTarget.series.chart;
                        const oCountrySeries = this._findSeries(oMapChart, MAP_SERIES_ID_COUNTRY);
                        if (oCountrySeries)
                        {
                                oCountrySeries.geodataSource.events.once("done", () => this.onCountryGeodataFetched(oMapChart, sCountryId));
                                oCountrySeries.geodataSource.url = `${MAP_GEODATA_BASE_URL}/${sMapName}.json`;
                                oCountrySeries.geodataSource.load();
                        }
                        else
                        {
                                this._log(LOG_MESSAGE_TEMPLATES["COUNTRY_SERIES_NOT_FOUND"]);
                        }
                }
                else
                {
                        this._log(LOG_MESSAGE_TEMPLATES["UNKNOWN_MAP"]);
                }
        }
        static onCountryGeodataFetched(aMapChart, aCountryId)
        {
                this._setWorldVisibility(aMapChart, false);
                const oCountryLineChart = this._getCountryLineChart(aMapChart);
                if (oCountryLineChart)
                {
                	LineChartHelper.onCountryChanged(oCountryLineChart, aCountryId);
                }
                else
                {
                	this._log(LOG_MESSAGE_TEMPLATES["COUNTRY_LINE_CHART_NOT_FOUND"]);
                }
        }
        static _getCountryLineChart(aMapChart)
        {
        	return aMapChart.children.values.find(child => child._className === "XYChart");
        }
        static _prepareMap(aMapChart)
        {
                this._prepareGeneralConfig(aMapChart);
                this._prepareWorldView(aMapChart);
                this._prepareCountryView(aMapChart);
                this._setWorldVisibility(aMapChart, true);
        }
        static _prepareGeneralConfig(aMapChart)
        {
                aMapChart.seriesContainer.events.disableType("doublehit");
                aMapChart.chartContainer.background.events.disableType("doublehit");
                aMapChart.zoomControl = new am4maps.ZoomControl();
                aMapChart.projection = new am4maps.projections.Miller();

                const oHomeButton = new am4core.Button();
                oHomeButton.events.on("hit", () => this.onHomeSelected(aMapChart));
                oHomeButton.icon = new am4core.Sprite();
                oHomeButton.padding(7, 5, 7, 5);
                oHomeButton.width = 30;
                oHomeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
                oHomeButton.marginBottom = 10;
                oHomeButton.parent = aMapChart.zoomControl;
                oHomeButton.insertBefore(aMapChart.zoomControl.plusButton);
        }
        static _prepareWorldView(aMapChart)
        {
                this._prepareWorldSeries(aMapChart);
                this._prepareWorldBubbles(aMapChart);
        }
        static _prepareCountryView(aMapChart)
        {
                this._prepareCountrySeries(aMapChart);
                this._prepareCountryBubbles(aMapChart);
                this._prepareCountryLineChart(aMapChart);
        }
        static _prepareWorldSeries(aMapChart)
        {
                const oWorldSeries = aMapChart.series.push(new am4maps.MapPolygonSeries());
                oWorldSeries.id = MAP_SERIES_ID_WORLD;
                oWorldSeries.useGeodata = true;
                oWorldSeries.geodata = am4geodata_worldLow;
                oWorldSeries.exclude = ["AQ"];

                const oWorldPolygon = oWorldSeries.mapPolygons.template;
                oWorldPolygon.events.on("hit", this.onCountrySelected.bind(this));

                this._prepareSeriesPolygons(aMapChart, oWorldPolygon);
        }
        static _prepareCountrySeries(aMapChart)
        {
                const oCountrySeries = aMapChart.series.push(new am4maps.MapPolygonSeries());
                oCountrySeries.id = MAP_SERIES_ID_COUNTRY;
                oCountrySeries.useGeodata = true;

                const oCountryPolygon = oCountrySeries.mapPolygons.template;

                this._prepareSeriesPolygons(aMapChart, oCountryPolygon);
        }
        static _prepareWorldBubbles(aMapChart)
        {
                const oData = this._getWorldBubblesData();
                this._prepareBubbleSeries(aMapChart, oData, MAP_SERIES_ID_WORLD);
        }
        static _prepareCountryBubbles(aMapChart)
        {
                this._prepareBubbleSeries(aMapChart, [], MAP_SERIES_ID_COUNTRY);
        }
        static _prepareBubbleSeries(aMapChart, aData, aSeriesId)
        {
                const oBubbleSeries = aMapChart.series.push(new am4maps.MapImageSeries());
                oBubbleSeries.id = this._getBubblesSeriesName(aSeriesId);
                oBubbleSeries.data = aData;
                oBubbleSeries.dataFields.value = "value";

                const oBubbleTemplate = oBubbleSeries.mapImages.template;
                oBubbleTemplate.nonScaling = true;
                oBubbleTemplate.adapter.add("latitude", (aLatitude, aTarget) => this._getPolygonCoord(aSeriesId, aLatitude, aTarget, "visualLatitude"));
                oBubbleTemplate.adapter.add("longitude", (aLongitude, aTarget) => this._getPolygonCoord(aSeriesId, aLongitude, aTarget, "visualLongitude"));
               
                const oCircle = oBubbleTemplate.createChild(am4core.Circle);
                oCircle.fillOpacity = 0.7;
                oCircle.propertyFields.fill = "color";

                oBubbleSeries.heatRules.push(
                {
                        "target": oCircle,
                        "property": "radius",
                        "min": 4,
                        "max": 30,
                        "dataField": "value"
                });
        }
        static _prepareCountryLineChart(aMapChart)
        {
                const oLineChart = aMapChart.createChild(am4charts.XYChart);
                LineChartHelper.renderLineChart(oLineChart);
        }
        static _getBubblesSeriesName(aSeriesId)
        {
                return `${aSeriesId}_${MAP_SERIES_ID_BUBBLE_SUFFIX}`;
        }
        static _setWorldVisibility(aMapChart, aShowWorld)
        {
                const oCountrySeries = this._findSeries(aMapChart, MAP_SERIES_ID_COUNTRY);
                const oCountryBubbles = this._findSeries(aMapChart, this._getBubblesSeriesName(MAP_SERIES_ID_COUNTRY));
                const oWorldSeries = this._findSeries(aMapChart, MAP_SERIES_ID_WORLD);
                const oWorldBubbles = this._findSeries(aMapChart, this._getBubblesSeriesName(MAP_SERIES_ID_WORLD));
                const oCountryLineChart = this._getCountryLineChart(aMapChart);
                if (aShowWorld)
                {
                        oWorldSeries.show();
                        oWorldBubbles.show();
                        oCountrySeries.hide();
                        oCountryBubbles.hide();
                        LineChartHelper.onCountryExit(oCountryLineChart);
                }
                else
                {
                        oWorldSeries.hide();
                        oWorldBubbles.hide();
                        oCountrySeries.show();
                        oCountryBubbles.show();             
                }
        }
        static _getPolygonCoord(aSeriesId, aFallbackCoord, aTarget, aCoordName)
        {
                const oMapChart = aTarget.series.chart;
                const oSeries = this._findSeries(oMapChart, aSeriesId);
                const sPolygonId = aTarget.dataItem.dataContext.id;
                const oPolygon = oSeries.getPolygonById(sPolygonId);
                if (oPolygon)
                {
                        return oPolygon[aCoordName];
                }
                else
                {
                        this._log(LOG_MESSAGE_TEMPLATES["POLYGON_NOT_FOUND"]);
                        return aFallbackCoord;
                }
        }
        static _getCountryBubblesData(aCountryId)
        {
                const oData = [
                {
                        "id": "AF",
                        "value": 32358260
                },
                {
                        "id": "DZ",
                        "value": 35980193
                },
                {
                        "id": "AO",
                        "value": 19618432
                },
                {
                        "id": "AR",
                        "value": 40764561
                }];
                return oData.map(aEntry =>
                {
                        const aModifiedEntry = aEntry;
                        aEntry.color = MAP_BUBBLES_COLOR;
                        return aModifiedEntry;
                });
        }
        static _getWorldBubblesData()
        {
                const oData = [
                {
                        "id": "AU",
                        "value": 22605732
                },
                {
                        "id": "BH",
                        "value": 1323535
                },
                {
                        "id": "BD",
                        "value": 150493658
                }];
                return oData.map(aEntry =>
                {
                        const aModifiedEntry = aEntry;
                        aEntry.color = MAP_BUBBLES_COLOR;
                        return aModifiedEntry;
                });
        }
        static _findSeries(oMapChart, aSeriesName)
        {
                return oMapChart.series.values.find(aSeries => aSeries.id === aSeriesName);
        }
        static _zoomIn(aEvent)
        {
                const oTarget = aEvent.target;
                oTarget.series.chart.zoomToMapObject(oTarget);
        }
        static _prepareSeriesPolygons(aChart, aPolygon)
        {
                aPolygon.tooltipText = "{name}";
                aPolygon.nonScalingStroke = true;
                aPolygon.strokeOpacity = 0.7;
                aPolygon.fill = am4core.color("#eee");
                aPolygon.propertyFields.fill = "color";
                this._preparePolygonHover(aChart, aPolygon);
        }
        static _preparePolygonHover(aChart, aPolygon)
        {
                const oPolygonHover = aPolygon.states.create("hover");
                oPolygonHover.properties.fill = aChart.colors.getIndex(9);
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts > MapChartHelper: ${aMessage}`);
        }
}
