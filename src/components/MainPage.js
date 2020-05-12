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
import PopUpDialog from '../containers/PopUpDialog';

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
// <<< amcharts helper

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
		this.handleAddBookmark = this.handleAddBookmark.bind(this);
		this.handleCloseBookmark = this.handleCloseBookmark.bind(this);
	}

	handleDeleteBookmark(e) {
		console.log("Bookmark deleted: " + e);
	}

	handleAddBookmark() {
		console.log("Bookmark added");
		this.setState({
			visible: true
		});
	}

	handleCloseBookmark() {
		console.log("Bookmark closed");
		this.setState({
			visible: false
		});

		document.getElementById('search').value = '';
	}

	render() {
		const placeholderItem = {
			0: { name: "Afghanistan" },
			1: { name: "Afghanistan" },
			2: { name: "Afghanistan" },
			3: { name: "Afghanistan" },
			4: { name: "Afghanistan" },
			5: { name: "Afghanistan" },
			6: { name: "Afghanistan" },
			7: { name: "Afghanistan" },
			8: { name: "Afghanistan" },
			9: { name: "Afghanistan" },
			10: { name: "Afghanistan" },
			11: { name: "Afghanistan" },
			12: { name: "Afghanistan" },
			13: { name: "Afghanistan" },
			14: { name: "Afghanistan" },
			15: { name: "Afghanistan" },
			16: { name: "Afghanistan" },
			17: { name: "Afghanistan" },
			18: { name: "Afghanistan" },
			19: { name: "Afghanistan" },
			20: { name: "Afghanistan" },
			21: { name: "Afghanistan" },
			22: { name: "Afghanistan" },
			23: { name: "Afghanistan" },
			24: { name: "Afghanistan" },
			25: { name: "Afghanistan" },
			26: { name: "Afghanistan" },
			27: { name: "Afghanistan" },
			28: { name: "Afghanistan" },
			29: { name: "Afghanistan" },
		};

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

					<PopUpDialog visible={this.state.visible} handleCloseBookmark={this.handleCloseBookmark}>
						<div className="search-container">
							<form className="search-form">
								<input autofocus id="search" className="search-input" type="text" placeholder="Qual o país que procura?"
									name="search"></input>
							</form>
						</div>

						<div className="country-container">
							{Object.values(placeholderItem).map(function (element, index) {
								return (
									<div className="country">
										<img className="country-flag" src="https://lh3.googleusercontent.com/proxy/iJ01fO11ZubDU1n4Uez9-GcIVDvza1gH9zylyUl8IFTPIJjJMBdTGGaKzAVq1nxdz-5gNis4leoLTLbZ6Hug5E0Z1uNq"></img>
										<div className="country-name">
											{element.name} , {index}
										</div>
									</div>
								);
							})}

						</div>
					</PopUpDialog>

					<div className="bookmark-add"><img onClick={this.handleAddBookmark} className="bookmark-add-icon" src={AddIcon} /></div>
				</div>

			</Page >
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
