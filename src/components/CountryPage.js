import React from 'react';

import {
    Page
} from 'react-onsenui';

import BackButton from '../icons/back-button.svg';

import '../css/CountryPage.css';

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
// <<<

class CountryPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var content = document.getElementById("am-charts-graph");

        const oMapChart = amChartsHelper.renderMap("am-charts-graph");

        oMapChart.events.on("onReady", (aEvent) => {
            amChartsHelper.toCountryView(oMapChart, this.props.country);
            content.style.visibility = "visible";
        });
    }

    render() {
        const placeholderItem = {
            0: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
            1: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
            2: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
            3: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
            4: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
            5: { name: "Afghanistan", cases: "10", recovered: "5", deaths: "12" },
        };

        let { navigator } = this.props;

        return (
            <Page className="background country-page-container">
                <div
                    className="back-button"
                    onClick={() => navigator.popPage()}
                >
                    <img src={BackButton} />
                </div>
                <div className="container" >
                    <div className="graph-container" id="am-charts-graph"></div>
                    <div className="timeline-container">
                        {Object.values(placeholderItem).map((element) => {
                            return (
                                <div className="day-container">
                                    <div className="date">
                                        24 May 2020
                                    </div>
                                    <div className="numbers">
                                        <div className="stat infected">
                                            Confirmed: 46
                                        </div>
                                        <div className="stat recovered">
                                            Recovered: 6
                                        </div>
                                        <div className="stat dead">
                                            Deaths: 1
                                        </div>
                                    </div>
                                    <div className="summary">
                                        Total 1768 cases, 122 recovered and 9 deaths
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Page>
        );
    }
}

export default CountryPage;
