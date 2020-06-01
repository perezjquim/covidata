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
                        "date": "2020-01-01",
                        "growth_rate": 7.1,
                },
               {
                        "date": "2020-01-31",
                        "growth_rate": 9.1,
                },                
                {
                        "date": "2020-02-01",
                        "growth_rate": 10.2
                },
                {
                        "date": "2020-02-28",
                        "growth_rate": 21.7
                },
                {
                        "date": "2020-03-01",
                        "growth_rate": 40.8
                },
                {
                        "date": "2020-03-15",
                        "growth_rate": 62.9
                },
                {
                        "date": "2020-03-30",
                        "growth_rate": 67.7
                },
                {
                        "date": "2020-04-01",
                        "growth_rate": 67.8
                },
                {
                        "date": "2020-04-15",
                        "growth_rate": 55.5
                },
                {
                        "date": "2020-04-30",
                        "growth_rate": 41.1
                },
                {
                        "date": "2020-05-01",
                        "growth_rate": 35.1
                },
                {
                        "date": "2020-05-15",
                        "growth_rate": 11.2
                },
                {
                        "date": "2020-05-30",
                        "growth_rate": 7.1
                }
                ];
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
                oValueAxis.hide();

                const oLineSeries = aLineChart.series.push(new am4charts.LineSeries());             
                oLineSeries.name = "Taxa de crescimento";
                oLineSeries.dataFields.dateX = "date";
                oLineSeries.dataFields.valueY = "growth_rate";

                const oBullet = oLineSeries.bullets.push(new am4charts.CircleBullet());
                oBullet.circle.fill = am4core.color("#fff");
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts > LineChartHelper: ${aMessage}`);
        }
}
