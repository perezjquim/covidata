const MAP_GEODATA_CONFIG_COUNTRIES = require("./config/countries");
const MAP_SERIES_ID_COUNTRY = "COUNTRY";
const MAP_SERIES_ID_WORLD = "WORLD";
const MAP_GEODATA_BASE_URL = "https://www.amcharts.com/lib/4/geodata/json";

export default class MapChartHelper
{
        static renderMap(aChart)
        {
                this._prepareGeneralConfig(aChart); // config - geral        
                this._prepareWorldSeries(aChart); // config - mundo
                this._prepareCountrySeries(aChart); // config - país
        }
        static onHomeSelected(aChart)
        {
            const oCountrySeries = this._findSeries(aChart, MAP_SERIES_ID_COUNTRY);
            oCountrySeries.hide();
            const oWorldSeries = this._findSeries(aChart, MAP_SERIES_ID_WORLD);
            oWorldSeries.show();
            aChart.goHome();
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
                        const oChart = oTarget.series.chart;
                        const oCountrySeries = this._findSeries(oChart, MAP_SERIES_ID_COUNTRY);
                        if (oCountrySeries)
                        {
                                oCountrySeries.geodataSource.url = `${MAP_GEODATA_BASE_URL}/${sMapName}.json`;
                                oCountrySeries.geodataSource.load();
                        }
                        else
                        {
                                this._log("country series not found");
                        }
                }
                else
                {
                        this._log("unknown map");
                }
        }
        static onGeodataFetched(aChart)
        {
                const oCountrySeries = this._findSeries(aChart, MAP_SERIES_ID_COUNTRY);
                const oWorldSeries = this._findSeries(aChart, MAP_SERIES_ID_WORLD);
                oWorldSeries.hide();
                oCountrySeries.show();
        }
        static _prepareGeneralConfig(aChart)
        {
                aChart.seriesContainer.events.disableType("doublehit");
                aChart.chartContainer.background.events.disableType("doublehit");
                aChart.zoomControl = new am4maps.ZoomControl();
                aChart.projection = new am4maps.projections.Miller();
                const oHomeButton = new am4core.Button();
                oHomeButton.events.on("hit", () => this.onHomeSelected(aChart));
                oHomeButton.icon = new am4core.Sprite();
                oHomeButton.padding(7, 5, 7, 5);
                oHomeButton.width = 30;
                oHomeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
                oHomeButton.marginBottom = 10;
                oHomeButton.parent = aChart.zoomControl;
                oHomeButton.insertBefore(aChart.zoomControl.plusButton);
        }
        static _prepareWorldSeries(aChart)
        {
                const oWorldSeries = aChart.series.push(new am4maps.MapPolygonSeries());
                oWorldSeries.id = MAP_SERIES_ID_WORLD;
                oWorldSeries.useGeodata = true;
                oWorldSeries.geodata = am4geodata_worldLow;
                oWorldSeries.exclude = ["AQ"];
                const oWorldPolygon = oWorldSeries.mapPolygons.template;
                oWorldPolygon.events.on("hit", this.onCountrySelected.bind(this));
                this._prepareSeriesPolygons(aChart, oWorldPolygon);
        }
        static _prepareCountrySeries(aChart)
        {
                const oCountrySeries = aChart.series.push(new am4maps.MapPolygonSeries());
                oCountrySeries.id = MAP_SERIES_ID_COUNTRY;
                oCountrySeries.useGeodata = true;
                oCountrySeries.hide();
                oCountrySeries.geodataSource.events.on("done", () => this.onGeodataFetched(aChart));
                const oCountryPolygon = oCountrySeries.mapPolygons.template;
                this._prepareSeriesPolygons(aChart, oCountryPolygon);
        }
        static _findSeries(aChart, aSeriesName)
        {
                return aChart.series.values.find(s => s.id === aSeriesName);
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
                aPolygon.strokeOpacity = 0.5;
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
