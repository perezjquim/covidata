import React from 'react';

import {
  Page
} from 'react-onsenui';

import NavBar from './NavBar';
import LocationList from '../containers/LocationList';
import AddLocation from '../containers/AddLocation';

class MainPage extends React.Component
{
	render()
	{
		return (<Page renderToolbar={() => <NavBar title='Onsen Weather' navigator={this.props.navigator} />}>
		    <LocationList navigator={this.props.navigator} />
		    <AddLocation />
		    {/* >>> testes */}
		    <div id="amcharts-test"/>
		    {/* <<< testes */}
		  </Page>
		);
	}

	componentDidMount()
	{
	      // >>> test - amcharts4 - piechart
	      // this._testPie();
	      // <<< test - amcharts4 - piechart    

	      // >>> test - amcharts4 - mapchart
	      	this._testMap();
	      // <<< test - amcharts4 - mapchart
	}

	componentWillUnmount()
	{
		if (this.oChart) this.oChart.dispose();
	}

	_testMap()
	{
	   	 // >>> test - amcharts4 - mapchart
	  	this.oChart = am4core.create(
	  	      "amcharts-test",
	  	      am4maps.MapChart
	  	    );

	  	const oChart = this.oChart;
	                 oChart.seriesContainer.events.disableType("doublehit");
	              oChart.chartContainer.background.events.disableType("doublehit");

	              oChart.zoomControl = new am4maps.ZoomControl();        

	              oChart.projection = new am4maps.projections.Miller();

	              const oWorldSeries = oChart.series.push(new am4maps.MapPolygonSeries());
	              oWorldSeries.useGeodata = true;
	              oWorldSeries.geodata = am4geodata_worldLow;
	              oWorldSeries.exclude = ["AQ"];

	              const oWorldPolygon = oWorldSeries.mapPolygons.template;
	              oWorldPolygon.tooltipText = "{name}";
	              oWorldPolygon.nonScalingStroke = true;
	              oWorldPolygon.strokeOpacity = 0.5;
	              oWorldPolygon.fill = am4core.color("#eee");
	              oWorldPolygon.propertyFields.fill = "color";

	              const oWorldHs = oWorldPolygon.states.create("hover");
	              oWorldHs.properties.fill = oChart.colors.getIndex(9);
	      // <<< test - amcharts4 - mapchart
	}

	_testPie()
	{
	    // >>> test - amcharts4 - piechart
	      this.oChart = am4core.create(
	        "amcharts-test",
	        am4charts.PieChart
	      );

	      const oChart = this.oChart;

	      oChart.legend = new am4charts.Legend();
	      oChart.data =
	      [
	        {
	          "country": "A",
	          "visits": 12
	        },
	        {
	          "country": "B",
	          "visits": 34
	        }
	      ];
	      const oSeries = oChart.series.create();
	        oSeries.dataFields.value = "visits";
	        oSeries.dataFields.category = "country";
	      // <<< test - amcharts4 - piechart    
	}
}

export default MainPage;
