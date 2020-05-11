import React from 'react';

import '../css/Page.css';
import '../css/Home.css';

import {
	Page,
	ProgressCircular
} from 'react-onsenui';

import DeleteIcon from '../icons/delete.svg';
import AddIcon from '../icons/add.svg';
import YellowDot from '../icons/dot-yellow.svg';
import RedDot from '../icons/dot-red.svg';
import GreenDot from '../icons/dot-green.svg';

import NavBar from './NavBar';

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
// <<< amcharts helper

class MainPage extends React.Component {

	handleDeleteBookmark() {
		alert("Bookmark deleted");
	}

	handleAddBookmark() {
		alert("Bookmark added");
	}

	render() {
		return (
			<Page className="background" renderBottomToolbar={() => <NavBar title='Onsen Weather' navigator={this.props.navigator} />}>
				<div className="page-container">
					<div className="title">
						<h1 className="title-main">COVID</h1>
						<span className="title-secondary">ata</span>
					</div>

					<div className="donut-scale-container">
						<div className="donut-scale-graph">
							<ProgressCircular className="graph-circle infected" value={100} secondaryValue={100} />
							<ProgressCircular className="graph-circle recovered" value={65} secondaryValue={100} />
							<ProgressCircular className="graph-circle dead" value={28} secondaryValue={100} />
						</div>
						<div className="donut-scale-stats-container">
							<div className="donut-scale-text-container">
								<div>
									<img className="donut-scale-dot" src={YellowDot} />
								</div>
								<div className="donut-scale-stats">
									<h3 className="stats-title text-stats">100 921</h3>
									<h4 className="stats-desc text-stats">casos</h4>
								</div>
							</div>

							<div className="donut-scale-text-container">
								<div>
									<img className="donut-scale-dot" src={GreenDot} />
								</div>
								<div className="donut-scale-stats">
									<h3 className="stats-title text-stats">12 921</h3>
									<h4 className="stats-desc text-stats">recuperados</h4>
								</div>
							</div>

							<div className="donut-scale-text-container">
								<div>
									<img className="donut-scale-dot" src={RedDot} />
								</div>
								<div className="donut-scale-stats">
									<h3 className="stats-title text-stats">5 546</h3>
									<h4 className="stats-desc text-stats">mortos</h4>
								</div>
							</div>

						</div>
					</div>

					<div className="bookmark-container">

						<div className="bookmark">
							<div className="bookmark-delete"><img onClick={this.handleDeleteBookmark} src={DeleteIcon} /></div>
							<h1 className="bookmark-title text-stats">Portugal</h1>
							<div className="bookmark-stats-container">
								<div className="bookmark-stats">
									<h1 className="stats-title text-stats">10</h1>
									<h1 className="stats-desc text-stats">casos</h1>
								</div>
								<div className="bookmark-stats">
									<h1 className="stats-title text-stats">5</h1>
									<h1 className="stats-desc text-stats">recuperados</h1>
								</div>
								<div className="bookmark-stats">
									<h1 className="stats-title text-stats">12</h1>
									<h1 className="stats-desc text-stats">mortos</h1>
								</div>
							</div>
						</div>

						<div className="bookmark">
							<div className="bookmark-delete"><img onClick={this.handleDeleteBookmark} src={DeleteIcon} /></div>
							<h1 className="bookmark-title text-stats">Portugal</h1>
							<div className="bookmark-stats-container">
								<div className="bookmark-stats">
									<h1 className="stats-title text-stats">10</h1>
									<h1 className="stats-desc text-stats">casos</h1>
								</div>
								<div className="bookmark-stats">
									<h1 className="stats-title text-stats">5</h1>
									<h1 className="stats-desc text-stats">recuperados</h1>
								</div>
								<div className="bookmark-stats">
									<h1 className="stats-title text-stats">12</h1>
									<h1 className="stats-desc text-stats">mortos</h1>
								</div>
							</div>
						</div>

					</div>

					<div className="bookmark-add"><img onClick={this.handleAddBookmark} className="bookmark-add-icon" src={AddIcon} /></div>
				</div>

			</Page>
		);
	}

	componentDidMount() {
		amChartsHelper.renderMap("amcharts-test");
	}

	componentWillUnmount() {
		amChartsHelper.onDispose("amcharts-test");
	}
}

export default MainPage;
