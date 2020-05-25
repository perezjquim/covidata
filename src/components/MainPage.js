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
		this.handleAddBookmarkButton = this.handleAddBookmarkButton.bind(this);
		this.handleCloseBookmark = this.handleCloseBookmark.bind(this);
	}

	handleDeleteBookmark(e) {
		alert("Bookmark deleted: " + e);
	}

	handleAddBookmark(code) {
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		var newBookmarks = [];

		if (bookmarks) newBookmarks = bookmarks;

		newBookmarks.push(code);
		localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));

		this.handleCloseBookmark();
	}

	handleAddBookmarkButton() {
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

	handleSearch(placeholderItem) {
		var input, filter, i, country;
		input = document.getElementById("search");
		filter = input.value.toUpperCase();
		country = document.getElementsByClassName("country");

		Object.values(placeholderItem).map(function (element, index) {
			console.log(element);
			if (element.name.toUpperCase().indexOf(filter) > -1) {
				console.log("block");
				country[index].style.display = "flex";
				console.log(country[index]);
			} else {
				console.log("none");
				country[index].style.display = "none";
				console.log(country[index]);
			}
		});
	}

	render() {
		const placeholderItem = {
			0: { name: "Afghanistan", code: "AF" },
			1: { name: "Chile", code: "CL" },
			2: { name: "Ukraine", code: "UA" },
			3: { name: "Taiwan", code: "TW" },
			4: { name: "Senegal", code: "SN" },
			5: { name: "Russian Federation", code: "RU" },
			6: { name: "Portugal", code: "PT" },
			7: { name: "Puerto Rico", code: "PR" },
			8: { name: "Palau", code: "PW" },
			9: { name: "Maldives", code: "MV" },
			10: { name: "Kiribati", code: "KI" },
			11: { name: "Indonesia", code: "ID" },
			12: { name: "Germany", code: "DE" },
			13: { name: "Ecuador", code: "EC" },
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
										<div onClick={() => navigator.pushPage({ component: CountryPage, key: "COUNTRY_PAGE", country: "PT" })}>
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
								<input autofocus id="search" className="search-input" type="text" placeholder="Qual o país que procura?"
									name="search" onChange={() => this.handleSearch(placeholderItem)}></input>
							</div>

							<div className="country-container" style={{ height: "80vh" }}>
								{Object.values(placeholderItem).map((element, index) => {
									return (
										<div className="country" onClick={() => this.handleAddBookmark(element.code)}>
											<img className="country-flag" src="https://cdn.countryflags.com/thumbs/portugal/flag-round-250.png"></img>
											<div className="country-name">
												{element.name}
											</div>
										</div>
									);
								})}

							</div>
						</PopUpDialog>

						<div className="bookmark-add"><img onClick={this.handleAddBookmarkButton} className="bookmark-add-icon" src={AddIcon} /></div>
					</div>
				</Swipeable>
			</Page>
		);
	}
}

export default MainPage;
