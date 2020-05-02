import MapChartHelper from './MapChartHelper';

export default class amChartsHelper
{
        static renderMap(aDivId)
        {
                const oMapChart = this._createElement(aDivId, am4maps.MapChart);
                MapChartHelper.renderMap(oMapChart);
        }
        static renderPie(aDivId)
        {
                const oChart = this._createElement(aDivId, am4charts.PieChart);
                oChart.legend = new am4charts.Legend();
                oChart.data = [
                {
                        "country": "A",
                        "visits": 12
                },
                {
                        "country": "B",
                        "visits": 34
                }];
                const oSeries = oChart.series.create();
                oSeries.dataFields.value = "visits";
                oSeries.dataFields.category = "country";
        }
        static onDispose(aDivId)
        {
                const oElement = this.oElements[aDivId];
                if (oElement)
                {
                        oElement.dispose();
                }
        }        
        static _createElement(aDivId, aElementType)
        {
                this._init();
                this.onDispose(aDivId);
                this.oElements[aDivId] = am4core.create(aDivId, aElementType);
                return this.oElements[aDivId];
        }
        static _init()
        {
                if (!this.oElements)
                {
                        this.oElements = {};
                }
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts > general module: ${aMessage}`);
        }
}
