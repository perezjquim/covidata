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
		    {/* >>> div onde será renderizada o mapa e etc */}
		    <div id="amcharts-test"/>
		    {/* <<< div onde será renderizada o mapa e etc */}
		  </Page>
		);
	}

	componentDidMount()
	{
	      // prepara e renderiza todo o mapa (e tudo lhe está associado)
	      const oMapChart = amChartsHelper.renderMap("amcharts-test");

	      // eventos:
	      // > onReady: quando o mapa está preparado e renderizado
	      // > onCountrySelected: quando o mapa entrar na visão de país (ao ser selecionado um no mapa)
	      // > onWorldView: quando o mapa voltar à visão mundial (ex.: ao clicarem no botão "home" do mapa)
	      oMapChart.events.on("onReady", (aEvent) =>
	      {
	      		console.log("onReady");
	      });
	      oMapChart.events.on("onCountrySelected", (aEvent) =>
	      {
		      	const sCountryId = aEvent.target.sSelectedCountry;
		      	console.log(`onCountrySelected - ${sCountryId}`);
	      });
	      oMapChart.events.on("onWorldView", (aData) => 
	      {
	      		console.log("onWorldView");
	      });

	      // chamadas que poderás ter que fazer:
	      // > toWorldView: voltar para a visão mundial      
	      // > toCountryView: navegar para um dado país
	      oMapChart.events.on("onReady", (aEvent) =>
	      {
	      		amChartsHelper.toCountryView(oMapChart, 'PT');
			oMapChart.events.once("onCountrySelected", (aEvent) =>
			{
			      	setTimeout(() => amChartsHelper.toWorldView(oMapChart), 5000);
			});
	      });
	}

	componentWillUnmount()
	{
	      amChartsHelper.onDispose("amcharts-test");
	}	
}

export default MainPage;
