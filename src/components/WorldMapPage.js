import React, { Component } from "react";
import { Swipeable } from "react-swipeable";

import "../css/WorldMap.css";
import "../css/Draggable.css";

import { Page, Dialog } from "react-onsenui";

import DragIcon from "../icons/drag.svg";

import NavBar from "./NavBar";
import News from "./News";

class WorldMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
    this.handleSwipeDown = this.handleSwipeDown.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
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
                    <form className="search-form">
                      <input
                        id="search-world-map"
                        className="search-input"
                        type="text"
                        placeholder="Qual o país que procura?"
                        name="search"
                      ></input>
                    </form>
                  </div>

                  <div className="country-container" style={{ height: "22vh" }}>
                    {Object.values(placeholderItem).map(function (
                      element,
                      index
                    ) {
                      return (
                        <div className="country">
                          <img
                            className="country-flag"
                            src="https://cdn.countryflags.com/thumbs/portugal/flag-round-250.png"
                          ></img>
                          <div className="country-name">
                            {element.name} , {index}
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
