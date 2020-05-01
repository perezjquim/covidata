export default class LineChartHelper
{
	static renderLineChart(aChart, aCountryId)
        {
        	// const oLineChart = aChart.createChild(am4charts.XYChart);
        	// oLineChart.data = this._getLineChartData(aCountryId);

        	// this._prepareLineSeries(aChart);
        }
        static _getLineChartData(aCountryId)
        {
        	return [ {"x": 1, "y": "a"}, {"x": 2, "y": "b"} ];
        }
        static _prepareLineSeries(aChart)
        {
        	this._prepareLineAxis(aChart);

        	const oLineSeries = aChart.series.push(new am4charts.LineSeries());
        	oLineSeries.dataFields.categoryX = "x";        	
        	oLineSeries.dataFields.valueY = "y";
        	oLineSeries.name = "line series test";
        	oLineSeries.tooltipText = "{name}: [bold]{valueY}[/]";
		oLineSeries.strokeWidth = 3;

		aChart.legend = new am4charts.Legend();
        }
        static _prepareLineAxis(aChart)
        {
		const oCategoryAxis = aChart.xAxes.push(new am4charts.CategoryAxis());
		oCategoryAxis.dataFields.category = "x";
		oCategoryAxis.renderer.minGridDistance = 40;
		oCategoryAxis.title.text = "category test";

		const oValueAxis = aChart.yAxes.push(new am4charts.ValueAxis());
		oValueAxis.title.text = "value test";
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts > LineChartHelper: ${aMessage}`);
        }        
}
