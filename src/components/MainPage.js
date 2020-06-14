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

// >>> api helper
import CountryAPIHelper from "../util/api/Country";
import BookmarkAPIHelper from '../util/api/addBookMarkCountry';
import MainPageAPIHelper from '../util/api/todaySummaryGlobalCountries';
// <<< api helper

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			bookmarks: [],
			placeholderItem: [
				{ name: "Afghanistan", code: "AF" },
				{ name: "Chile", code: "CL" },
				{ name: "Ukraine", code: "UA" },
				{ name: "Taiwan", code: "TW" },
				{ name: "Senegal", code: "SN" },
				{ name: "Russian Federation", code: "RU" },
				{ name: "Portugal", code: "PT" },
				{ name: "Puerto Rico", code: "PR" },
				{ name: "Palau", code: "PW" },
				{ name: "Maldives", code: "MV" },
				{ name: "Kiribati", code: "KI" },
				{ name: "Indonesia", code: "ID" },
				{ name: "Germany", code: "DE" },
				{ name: "Ecuador", code: "EC" },
			],
			countries: [],
			global: {}
		};
		this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
		this.handleAddBookmark = this.handleAddBookmark.bind(this);
		this.handleAddBookmarkButton = this.handleAddBookmarkButton.bind(this);
		this.handleCloseBookmark = this.handleCloseBookmark.bind(this);
		this.checkIfExists = this.checkIfExists.bind(this);
	}

	async componentDidMount() {
		const oCountries = await BookmarkAPIHelper.getBookMarkedCountries();
		const oCountriesMapped = oCountries.map((aEntry) => {
			return {
				name: aEntry.country,
				code: aEntry.countryInfo.iso2,
				flag: aEntry.countryInfo.flag
			};
		});

		var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || []);

		const oBookmark = await BookmarkAPIHelper.getBookMarkedCountries(bookmarks);
		let newBookmarks = 0;

		console.log(Object.keys(oBookmark).length);

		Object.keys(oBookmark).length < 23
			? newBookmarks = oBookmark.map((aEntry) => {
				return {
					confirmed: aEntry.cases,
					recovered: aEntry.recovered,
					deaths: aEntry.deaths,
					name: aEntry.country,
					code: aEntry.countryInfo.iso2
				};
			})
			: Object.keys(oBookmark).length === 23 &&
			(newBookmarks = [{
				confirmed: oBookmark.cases,
				recovered: oBookmark.recovered,
				deaths: oBookmark.deaths,
				name: oBookmark.country,
				code: oBookmark.countryInfo && oBookmark.countryInfo.iso2
			}]);

		const oData = await MainPageAPIHelper.getTodaysSummary();
		const oSummary = oData.Global;
		const formattedGlobal = {
			tDeaths: this.numberWithSpaces(oSummary.TotalDeaths),
			tConfirmed: this.numberWithSpaces(oSummary.TotalConfirmed),
			tRecovered: this.numberWithSpaces(oSummary.TotalRecovered),
			sDeaths: oSummary.TotalDeaths * 100 / oSummary.TotalConfirmed,
			sRecovered: oSummary.TotalRecovered * 100 / oSummary.TotalConfirmed
		};

		this.setState({
			bookmarks: newBookmarks,
			global: formattedGlobal,
			countries: oCountriesMapped
		});

		console.log(this.state);
	}

	numberWithSpaces(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

	checkIfExists(country) {
		var bookmarks = this.state.bookmarks;
		var exists = false;

		bookmarks !== 0 && bookmarks.forEach(element => {
			if (element.code.indexOf(country.code) > -1) {
				exists = true;
			}
		});

		return exists;
	}

	handleDeleteBookmark(country) {
		var bookmarksStorage = JSON.parse(localStorage.getItem("bookmarks"));
		var bookmarksState = this.state.bookmarks;

		bookmarksStorage.forEach((element, index) => {
			if (element.indexOf(country.code) > -1) {
				bookmarksStorage.splice(index, 1);
			}
		});

		bookmarksState.forEach((el, i) => {
			if (el.code.indexOf(country.code) > -1) {
				bookmarksState.splice(i, 1);
			}
		});

		localStorage.setItem("bookmarks", JSON.stringify(bookmarksStorage));

		this.setState({
			bookmarks: bookmarksState
		});
	}

	async handleAddBookmark(country) {
		var bookmarksStorage = JSON.parse(localStorage.getItem("bookmarks"));
		var bookmarksState = this.state.bookmarks;
		var newBookmarksStorage = [];
		var newBookmarksState = [];

		if (bookmarksStorage) newBookmarksStorage = bookmarksStorage;
		if (bookmarksState) newBookmarksState = bookmarksState;

		if (!this.checkIfExists(country)) {
			newBookmarksStorage.push(country.code);
			const oBookmark = await BookmarkAPIHelper.getBookMarkedCountries(country.code);
			const newBookmark = {
				confirmed: oBookmark.message ? 0 : oBookmark.cases,
				recovered: oBookmark.message ? 0 : oBookmark.recovered,
				deaths: oBookmark.message ? 0 : oBookmark.deaths,
				name: oBookmark.message ? country.name : oBookmark.country,
				code: oBookmark.message ? country.code : oBookmark.countryInfo.iso2
			};
			newBookmarksState.push(newBookmark);
		}

		localStorage.setItem("bookmarks", JSON.stringify(newBookmarksStorage));

		this.setState({
			bookmarks: newBookmarksState
		});

		this.handleCloseBookmark();
	}

	handleAddBookmarkButton() {
		this.setState({
			visible: true
		});
	}

	handleCloseBookmark() {
		this.setState({
			visible: false
		});

		document.getElementById('search').value = '';
	}

	handleSearch(placeholderItem) {
		var input, filter, country;
		input = document.getElementById("search");
		filter = input.value.toUpperCase();
		country = document.getElementsByClassName("country");

		Object.values(placeholderItem).map(function (element, index) {
			if (element.name.toUpperCase().indexOf(filter) > -1) {
				country[index].style.display = "flex";
			} else {
				country[index].style.display = "none";
			}
		});
	}

	render() {
		let { navigator, currentPage } = this.props;
		let { bookmarks, global, countries } = this.state;

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
								<ProgressCircular className="graph-circle recovered" value={global.sRecovered} secondaryValue={100} />
								<ProgressCircular className="graph-circle dead" value={global.sDeaths} secondaryValue={100} />
							</div>
							<div className="donut-scale-stats-container">
								<div className="donut-scale-text-container">
									<div>
										<img className="donut-scale-dot" src={YellowDot} />
									</div>
									<div className="donut-scale-stats">
										<h3 className="stats-title text-stats">{this.state.global.tConfirmed}</h3>
										<h4 className="stats-desc text-stats">casos</h4>
									</div>
								</div>

								<div className="donut-scale-text-container">
									<div>
										<img className="donut-scale-dot" src={GreenDot} />
									</div>
									<div className="donut-scale-stats">
										<h3 className="stats-title text-stats">{this.state.global.tRecovered}</h3>
										<h4 className="stats-desc text-stats">recuperados</h4>
									</div>
								</div>

								<div className="donut-scale-text-container">
									<div>
										<img className="donut-scale-dot" src={RedDot} />
									</div>
									<div className="donut-scale-stats">
										<h3 className="stats-title text-stats">{this.state.global.tDeaths}</h3>
										<h4 className="stats-desc text-stats">mortos</h4>
									</div>
								</div>

							</div>
						</div>

						<div className="bookmark-container">
							{Object.values(bookmarks).map((element) => {
								return (
									<div className="bookmark" >
										<div className="bookmark-delete"><img onClick={() => this.handleDeleteBookmark(element)} src={DeleteIcon} /></div>
										<div onClick={() => navigator.pushPage({ component: CountryPage, key: "COUNTRY_PAGE", country: element.code })}>
											<h1 className="bookmark-title text-stats">{element.name}</h1>
											<div className="bookmark-stats-container">
												<div className="bookmark-stats">
													<h1 className="stats-number text-stats">{element.confirmed}</h1>
													<h1 className="stats-desc text-stats">casos</h1>
												</div>
												<div className="bookmark-stats">
													<h1 className="stats-number text-stats">{element.recovered}</h1>
													<h1 className="stats-desc text-stats">recuperados</h1>
												</div>
												<div className="bookmark-stats">
													<h1 className="stats-number text-stats">{element.deaths}</h1>
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
								<input
									autofocus
									id="search"
									className="search-input"
									type="text"
									placeholder="Qual o país que procura?"
									name="search"
									onChange={() => this.handleSearch(countries)}>
								</input>
							</div>

							<div className="country-container" style={{ height: "80vh" }}>
								{Object.values(countries).map((element) => {
									return (
										<div className="country" id={"country-" + element.code} onClick={() => this.handleAddBookmark(element)}>
											<img className="country-flag" src={element.flag}></img>
											<div className="country-name">
												{element.name}
											</div>
										</div>
									);
								})};
							</div>
						</PopUpDialog>

						<div className="bookmark-add"><img onClick={this.handleAddBookmarkButton} className="bookmark-add-icon" src={AddIcon} /></div>
					</div>
				</Swipeable >
			</Page >
		);
	}
}

export default MainPage;