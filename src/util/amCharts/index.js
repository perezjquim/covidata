import MapChartHelper from './MapChartHelper';

export default class amChartsHelper
{
        static renderMap(aDivId)
        {
                const oMapChart = this._createElement(aDivId, am4maps.MapChart);
                MapChartHelper.renderMap(oMapChart);
                return oMapChart;
        }
        static toWorldView(aMapChart)
        {
                MapChartHelper.toWorldView(aMapChart);                
        }
        static toCountryView(aMapChart, aCountryId)
        {
                MapChartHelper.toCountryView(aMapChart, aCountryId);
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
