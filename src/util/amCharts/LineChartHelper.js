export default class LineChartHelper
{
        static renderLineChart(aLineChart)
        {
                aLineChart.data = this._getLineChartData();
                this._prepareLineSeries(aLineChart);
                this._setVisibility(aLineChart, false);
        }
        static onCountryExit(aLineChart)
        {
        	this._setVisibility(aLineChart, false);
        }
        static onCountryChanged(aLineChart, aCountryId)
        {
                aLineChart.data = this._getLineChartData(aCountryId);
                this._setVisibility(aLineChart, true);
        }
        static _setVisibility(aLineChart, aShow)
        {     
        	aLineChart.setDisabled(!aShow);	
        	if (aShow) aLineChart.show();
        }
        static _getLineChartData(aCountryId)
        {
        	// TODO - descartar info dummy        	
                return [
                {
                        "date": "2012-01-01",
                        "value": 1111
                },
                {
                        "date": "2013-03-03",
                        "value": 33
                }];
        }
        static _prepareLineSeries(aLineChart)
        {
                aLineChart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
                aLineChart.cursor = new am4charts.XYCursor();
                aLineChart.cursor.behavior = "panXY";
                aLineChart.cursor.xAxis = oDateAxis;
                aLineChart.cursor.snapToSeries = oLineSeries;                

                const oDateAxis = aLineChart.xAxes.push(new am4charts.DateAxis());
                oDateAxis.dataFields.dateX = "date";

                const oValueAxis = aLineChart.yAxes.push(new am4charts.ValueAxis());

                const oLineSeries = aLineChart.series.push(new am4charts.LineSeries());             
                oLineSeries.name = "Web Traffic";
                oLineSeries.dataFields.dateX = "date";
                oLineSeries.dataFields.valueY = "value";

                const oBullet = oLineSeries.bullets.push(new am4charts.CircleBullet());
                oBullet.circle.fill = am4core.color("#fff");
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts > LineChartHelper: ${aMessage}`);
        }
}
