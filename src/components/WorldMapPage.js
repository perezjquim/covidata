import React, { Component } from "react";
import { Swipeable } from "react-swipeable";

import "../css/WorldMap.css";
import "../css/Draggable.css";

import { Page, Dialog } from "react-onsenui";

import DragIcon from "../icons/drag.svg";

import NavBar from "./NavBar";
import News from "./News";

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
// <<<

import BookmarkAPIHelper from '../util/api/addBookMarkCountry';

import CountryPage from './CountryPage';

class WorldMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      countries: [],
    };
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
    this.handleSwipeDown = this.handleSwipeDown.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const oMapChart = amChartsHelper.renderMap("am-charts-world-map");
    oMapChart.events.on("onCountrySelected", (aEvent) => {
      const sCountryId = aEvent.target.sSelectedCountry;
      this.props.navigator.pushPage({ component: CountryPage, key: "COUNTRY_PAGE", country: sCountryId });
    });

    const oCountries = await BookmarkAPIHelper.getBookMarkedCountries();
    const oCountriesMapped = oCountries.map((aEntry) => {
      return {
        name: aEntry.country,
        code: aEntry.countryInfo.iso2,
        flag: aEntry.countryInfo.flag
      };
    });

    this.setState({
      countries: oCountriesMapped
    });
  }

  handleSwipeDown() {
    this.setState({
      visible: true,
    });
  }
  handleSwipeLeft() {
    this.props.navigator.pushPage({ component: News, key: this.props.pages[2].name });
    this.setState({
      visible: false,
    });
  }
  handleSwipeRight() {
    this.props.navigator.popPage();
    this.setState({
      visible: false,
    });
  }
  handleSwipeUp() {
    this.setState({
      visible: false,
    });
  }

  handleCloseSearch() {
    this.setState({
      visible: false,
    });
    document.getElementById("search-world-map").value = "";
  }

  handleClickCountry(country) {
    this.setState({
      visible: false,
    });
    this.props.navigator.pushPage({ component: CountryPage, key: "COUNTRY_PAGE", country: country.code });
  }

  handleSearch() {
    let { countries } = this.state;
    var input, filter, country;
    input = document.getElementById("search-world-map");
    filter = input.value.toUpperCase();
    country = document.getElementsByClassName("country-world-map");

    Object.values(countries).map(function (element, index) {
      if (element.name.toUpperCase().indexOf(filter) > -1) {
        country[index].style.display = "flex";
      } else {
        country[index].style.display = "none";
      }
    });
  }

  render() {
    let { countries } = this.state;
    let { navigator, currentPage } = this.props;

    return (
      <Page className="background world-map-page-container"
        renderBottomToolbar={() => <NavBar
          navigator={navigator}
          currentPage={currentPage} />
        }
      >
        <div>
          <Swipeable
            style={{ width: "100%", height: "100%" }}
            onSwipedRight={() => this.handleSwipeRight()}
            onSwipedLeft={() => this.handleSwipeLeft()}
          >
            <div className="world-map-container">
              <div className=" absolute-draggable-container">
                <Swipeable
                  className="draggable-icon-container absolute-draggable"
                  onSwipedDown={() => this.handleSwipeDown()}
                >
                  <div className="draggable-icon absolute-icon">
                    <img src={DragIcon}></img>
                  </div>
                </Swipeable>
              </div>

              <div className="map-container" id="am-charts-world-map"></div>

              <Dialog
                className="world-map-dialog-container"
                onCancel={this.handleCloseSearch}
                isOpen={this.state.visible}
                cancelable
              >
                <div className="world-map-dialog">
                  <div className="search-container">
                    <input
                      id="search-world-map"
                      className="search-input"
                      type="text"
                      placeholder="Qual o país que procura?"
                      name="search"
                      onChange={this.handleSearch}>
                    </input>
                  </div>

                  <div className="country-container" style={{ height: "22vh" }}>
                    {Object.values(countries).map((element) => {
                      return (
                        <div className="country country-world-map" onClick={() => this.handleClickCountry(element)}>
                          <img
                            className="country-flag"
                            src={element.flag}
                          ></img>
                          <div className="country-name">
                            {element.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Swipeable
                    className="draggable-icon-container"
                    style={{ height: "30px" }}
                    onSwipedUp={() => this.handleSwipeUp()}
                  >
                    <div className="draggable-icon">
                      <img src={DragIcon}></img>
                    </div>
                  </Swipeable>
                </div>
              </Dialog>
            </div>
          </Swipeable>
        </div>
      </Page >
    );
  }
}

export default WorldMapPage;
