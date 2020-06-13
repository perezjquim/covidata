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
import "babel-polyfill";
import APIHelper from '../util/api';
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
			]
		};
		this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
		this.handleAddBookmark = this.handleAddBookmark.bind(this);
		this.handleAddBookmarkButton = this.handleAddBookmarkButton.bind(this);
		this.handleCloseBookmark = this.handleCloseBookmark.bind(this);
		this.checkIfExists = this.checkIfExists.bind(this);
	}

	async componentDidMount() {
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || []);
		var placeholderItem = this.state.placeholderItem;
		var newBookmarks = [];

		bookmarks.forEach(el => {
			Object.values(placeholderItem).map((element) => {
				if (element.code.indexOf(el) > -1) {
					newBookmarks.push(element);
				}
			});
		});

		console.log(newBookmarks);

		this.setState({
			bookmarks: newBookmarks
		});
	}

	checkIfExists(country) {
		var bookmarks = this.state.bookmarks;
		var exists = false;

		bookmarks.forEach(element => {
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

	handleAddBookmark(country) {
		var bookmarksStorage = JSON.parse(localStorage.getItem("bookmarks"));
		var bookmarksState = this.state.bookmarks;
		var newBookmarksStorage = [];
		var newBookmarksState = [];

		if (bookmarksStorage) newBookmarksStorage = bookmarksStorage;
		if (bookmarksState) newBookmarksState = bookmarksState;

		if (!this.checkIfExists(country)) {
			newBookmarksStorage.push(country.code);
			newBookmarksState.push(country);
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
		let { bookmarks, placeholderItem } = this.state;

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
							{Object.values(bookmarks).map((element) => {
								return (
									<div className="bookmark" >
										<div className="bookmark-delete"><img onClick={() => this.handleDeleteBookmark(element)} src={DeleteIcon} /></div>
										<div onClick={() => navigator.pushPage({ component: CountryPage, key: "COUNTRY_PAGE", country: element.code })}>
											<h1 className="bookmark-title text-stats">{element.name}</h1>
											<div className="bookmark-stats-container">
												<div className="bookmark-stats">
													<h1 className="stats-number text-stats">512</h1>
													<h1 className="stats-desc text-stats">casos</h1>
												</div>
												<div className="bookmark-stats">
													<h1 className="stats-number text-stats">87</h1>
													<h1 className="stats-desc text-stats">recuperados</h1>
												</div>
												<div className="bookmark-stats">
													<h1 className="stats-number text-stats">25</h1>
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
									onChange={() => this.handleSearch(placeholderItem)}>
								</input>
							</div>

							<div className="country-container" style={{ height: "80vh" }}>
								{Object.values(placeholderItem).map((element) => {
									return (
										<div className="country" id={"country-" + element.code} onClick={() => this.handleAddBookmark(element)}>
											<img className="country-flag" src="https://cdn.countryflags.com/thumbs/portugal/flag-round-250.png"></img>
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