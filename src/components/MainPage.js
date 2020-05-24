import React from 'react';
import { Swipeable } from 'react-swipeable';

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
import Title from '../containers/Title';

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
import WorldMapPage from './WorldMapPage';
import CountryPage from './CountryPage';
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
		alert("Bookmark deleted: " + e);
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

		const placeholderBookmark = {
			0: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
			1: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
		};

		let { navigator, currentPage } = this.props;

		return (
			<Page className="background home-page-container"
				renderBottomToolbar={() => <NavBar
					navigator={navigator}
					currentPage={currentPage} />
				}
			>
				<Swipeable
					style={{ width: "100%", height: "100%" }}
					onSwipedLeft={() => navigator.pushPage({ component: WorldMapPage, key: this.props.pages[1].name })}
				>
					<div className="page-container" >
						<Title title="ata" />

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

							{Object.values(placeholderBookmark).map((element) => {
								return (
									<div className="bookmark" >
										<div className="bookmark-delete"><img onClick={this.handleDeleteBookmark} src={DeleteIcon} /></div>
										<div onClick={() => navigator.pushPage({ component: CountryPage, key: "COUNTRY_PAGE" })}>
											<h1 className="bookmark-title text-stats">{element.name}</h1>
											<div className="bookmark-stats-container">
												<div className="bookmark-stats">
													<h1 className="stats-title text-stats">{element.cases}</h1>
													<h1 className="stats-desc text-stats">casos</h1>
												</div>
												<div className="bookmark-stats">
													<h1 className="stats-title text-stats">{element.recovered}</h1>
													<h1 className="stats-desc text-stats">recuperados</h1>
												</div>
												<div className="bookmark-stats">
													<h1 className="stats-title text-stats">{element.deaths}</h1>
													<h1 className="stats-desc text-stats">mortos</h1>
												</div>
											</div>
										</div>

									</div>
								);
							})}

						</div>

						<PopUpDialog visible={this.state.visible} handleCloseBookmark={this.handleCloseBookmark}>
							<div className="search-container">
								<form className="search-form">
									<input autofocus id="search" className="search-input" type="text" placeholder="Qual o país que procura?"
										name="search"></input>
								</form>
							</div>

							<div className="country-container" style={{ height: "80vh" }}>
								{Object.values(placeholderItem).map(function (element, index) {
									return (
										<div className="country">
											<img className="country-flag" src="https://cdn.countryflags.com/thumbs/portugal/flag-round-250.png"></img>
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
				</Swipeable>
			</Page>
		);
	}
}

export default MainPage;
