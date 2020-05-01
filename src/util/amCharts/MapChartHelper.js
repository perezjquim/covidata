import LineChartHelper from './LineChartHelper';

const MAP_GEODATA_CONFIG_COUNTRIES = require("./config/countries");
const MAP_SERIES_ID_COUNTRY = "COUNTRY";
const MAP_SERIES_ID_WORLD = "WORLD";
const MAP_SERIES_ID_BUBBLE_SUFFIX = "BUBBLE";
const MAP_GEODATA_BASE_URL = "https://www.amcharts.com/lib/4/geodata/json";
const MAP_BUBBLES_COLOR = "#8aabb0";

const LOG_MESSAGE_TEMPLATES =
{
	"COUNTRY_SERIES_NOT_FOUND": "country series not found",
	"POLYGON_NOT_FOUND": "polygon not found",
	"UNKNOWN_MAP": "unknown map"
};

export default class MapChartHelper
{
        static renderMap(aChart)
        {
        	this._prepareMap(aChart);
        }
        static onHomeSelected(aChart)
        {
            this._setWorldVisibility(aChart, true);
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
		                oCountrySeries.geodataSource.events.once("done", () => this.onCountryGeodataFetched(oChart, sCountryId));           	
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
        static onCountryGeodataFetched(aChart, aCountryId)
        {
                this._setWorldVisibility(aChart, false);
                LineChartHelper.renderLineChart(aChart, aCountryId);         
        }        
        static _prepareMap(aChart)
        {
                this._prepareGeneralConfig(aChart);     
                this._prepareWorldView(aChart);
                this._prepareCountryView(aChart);
                this._setWorldVisibility(aChart, true);                
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
        static _prepareWorldView(aChart)
        {
                this._prepareWorldSeries(aChart);
                this._prepareWorldBubbles(aChart);
        }
        static _prepareCountryView(aChart)
        {
                this._prepareCountrySeries(aChart);
                this._prepareCountryBubbles(aChart);
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
                const oCountryPolygon = oCountrySeries.mapPolygons.template;
                this._prepareSeriesPolygons(aChart, oCountryPolygon);
        }
        static _prepareWorldBubbles(aChart)
        {
        	const oData = this._getWorldBubblesData();
        	this._prepareBubbleSeries(aChart, oData, MAP_SERIES_ID_WORLD);
        }
        static _prepareCountryBubbles(aChart)
        {
        	this._prepareBubbleSeries(aChart, [], MAP_SERIES_ID_COUNTRY);
        }        
        static _prepareBubbleSeries(aChart, aData, aSeriesId)
        {
        	const oBubbleSeries = aChart.series.push(new am4maps.MapImageSeries());
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

		oBubbleSeries.heatRules.push({
		  "target": oCircle,
		  "property": "radius",
		  "min": 4,
		  "max": 30,
		  "dataField": "value"
		});
        }
        static _getBubblesSeriesName(aSeriesId)
        {
        	return `${aSeriesId}_${MAP_SERIES_ID_BUBBLE_SUFFIX}`;
        }
        static _setWorldVisibility(aChart, aShowWorld)
        {
                const oCountrySeries = this._findSeries(aChart, MAP_SERIES_ID_COUNTRY);
                const oCountryBubbles = this._findSeries(aChart, this._getBubblesSeriesName(MAP_SERIES_ID_COUNTRY));              
                const oWorldSeries = this._findSeries(aChart, MAP_SERIES_ID_WORLD);
                const oWorldBubbles = this._findSeries(aChart, this._getBubblesSeriesName(MAP_SERIES_ID_WORLD));

        	if (aShowWorld)
        	{
        		oWorldSeries.show();
        		oWorldBubbles.show();
        		oCountrySeries.hide();
        		oCountryBubbles.hide();
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
        	const oChart = aTarget.series.chart;
		const oSeries = this._findSeries(oChart, aSeriesId);

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
			  { "id": "AF", "value": 32358260 },
			  { "id": "DZ", "value": 35980193 },
			  { "id": "AO", "value": 19618432 },
			  { "id": "AR", "value": 40764561 },
			  { "id": "AM", "value": 3100236 },
			  { "id": "AU", "value": 22605732 },
			  { "id": "BH", "value": 1323535 },
			  { "id": "BD", "value": 150493658 }
			];
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
			  { "id": "AF", "value": 32358260 },
			  { "id": "DZ", "value": 35980193 },
			  { "id": "AO", "value": 19618432 },
			  { "id": "AR", "value": 40764561 },
			  { "id": "AM", "value": 3100236 },
			  { "id": "AU", "value": 22605732 },
			  { "id": "BH", "value": 1323535 },
			  { "id": "BD", "value": 150493658 }
			];
		return oData.map(aEntry =>
        	{
        		const aModifiedEntry = aEntry;
        		aEntry.color = MAP_BUBBLES_COLOR;
        		return aModifiedEntry;
        	});
        }
        static _findSeries(aChart, aSeriesName)
        {
                return aChart.series.values.find(aSeries => aSeries.id === aSeriesName);
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
