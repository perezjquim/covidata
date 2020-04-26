import MapChartHelper from './MapChartHelper';

export default class amChartsHelper
{
        static renderMap(aDivId)
        {
                const oChart = this._createChart(aDivId, am4maps.MapChart);
                MapChartHelper.renderMap(oChart);
        }
        static renderPie(aDivId)
        {
                const oChart = this._createChart(aDivId, am4charts.PieChart);
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
                const oChart = this.oChart[aDivId];
                if (oChart)
                {
                        oChart.dispose();
                }
        }        
        static _createChart(aDivId, aChartType)
        {
                this._init();
                this.onDispose(aDivId);
                this.oChart[aDivId] = am4core.create(aDivId, aChartType);
                return this.oChart[aDivId];
        }
        static _init()
        {
                if (!this.oChart)
                {
                        this.oChart = {};
                }
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts: ${aMessage}`);
        }
}
