import TimelineAPIHelper from '../api/dayOneInfoPerCountry';

export default class LineChartHelper
{
        static renderLineChart(aLineChart)
        {
                aLineChart.data = [];
                this._prepareLineSeries(aLineChart);
                this._setVisibility(aLineChart, false);
        }
        static onCountryExit(aLineChart)
        {
        	this._setVisibility(aLineChart, false);
        }
        static async onCountryChanged(aLineChart, aCountryId)
        {
                aLineChart.data = await this._getLineChartData(aCountryId);
                this._setVisibility(aLineChart, true);
        }
        static _setVisibility(aLineChart, aShow)
        {     
        	aLineChart.setDisabled(!aShow);	
        	if (aShow) aLineChart.show();
        }
        static async _getLineChartData(aCountryId)
        {
            const oData = await TimelineAPIHelper.getDayOneInfoCountry(aCountryId);
            return oData.map((aEntry) =>
            {
                return {
                    "date": aEntry.Date.substr(0,10),
                    "active": aEntry.Active
                };
            });
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
                oLineSeries.name = "Nº casos ativos";
                oLineSeries.dataFields.dateX = "date";
                oLineSeries.dataFields.valueY = "active";

                const oBullet = oLineSeries.bullets.push(new am4charts.CircleBullet());
                oBullet.circle.fill = am4core.color("#fff");
        }
        static _log(aMessage)
        {
                console.warn(`COVIData > amCharts > LineChartHelper: ${aMessage}`);
        }
}
