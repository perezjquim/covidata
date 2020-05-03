import React from 'react';

import {
  Page
} from 'react-onsenui';

import NavBar from './NavBar';
import LocationList from '../containers/LocationList';
import AddLocation from '../containers/AddLocation';

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
// <<< amcharts helper

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
	      const oMapChart = amChartsHelper.renderMap("amcharts-test");
	      oMapChart.events.on("onCountrySelected", function(oData)
	      {
	      	alert("onCountrySelected");
	      });
	      oMapChart.events.on("onCountryGeodataFetched", function(oData)
	      {
	      	alert("onCountryGeodataFetched");
	      });	      
	      oMapChart.events.on("onHomeSelected", function(oData)
	      {
	      	alert("onHomeSelected");
	      });	      
	}

	componentWillUnmount()
	{
	      amChartsHelper.onDispose("amcharts-test");
	}	
}

export default MainPage;
