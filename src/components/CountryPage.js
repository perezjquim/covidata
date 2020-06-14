import React from 'react';

import {
    Page
} from 'react-onsenui';

import BackButton from '../icons/back-button.svg';

import '../css/CountryPage.css';

// >>> amcharts helper
import amChartsHelper from '../util/amCharts';
// <<<

import SinglePageAPIHelper from '../util/api/dayOneInfoPerCountry';

class CountryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { timeline: [] };
    }

    async componentDidMount() {
        var content = document.getElementById("am-charts-graph");

        const oMapChart = amChartsHelper.renderMap("am-charts-graph");

        oMapChart.events.on("onReady", (aEvent) => {
            amChartsHelper.toCountryView(oMapChart, this.props.country);
            content.style.visibility = "visible";
        });

        const oTimeline = await SinglePageAPIHelper.getDayOneInfoCountry(this.props.country);
        const oTimelineMapped = oTimeline.map((aEntry, index) => {
            const d = new Date(aEntry.Date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const sDate = d.toLocaleDateString(undefined, options);
            let lDeaths = 0;
            let lConfirmed = 0;
            let lRecovered = 0;

            index >= 1
                ? lDeaths = oTimeline[index - 1].Deaths - aEntry.Deaths
                : lDeaths = aEntry.Deaths;

            index >= 1
                ? lConfirmed = oTimeline[index - 1].Confirmed - aEntry.Confirmed
                : lConfirmed = aEntry.Confirmed;

            index >= 1
                ? lRecovered = oTimeline[index - 1].Recovered - aEntry.Recovered
                : lRecovered = aEntry.Recovered;

            return {
                tDeaths: aEntry.Deaths,
                tConfirmed: aEntry.Confirmed,
                tRecovered: aEntry.Recovered,
                lDeaths: Math.abs(lDeaths),
                lConfirmed: Math.abs(lConfirmed),
                lRecovered: Math.abs(lRecovered),
                date: sDate
            };
        });
        this.setState({ timeline: oTimelineMapped.reverse() });
    }

    render() {
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
                        {Object.values(this.state.timeline).map((element) => {
                            return (
                                <div className="day-container">
                                    <div className="date">
                                        {element.date}
                                    </div>
                                    <div className="summary">
                                        Total {element.tConfirmed} cases, {element.tRecovered} recovered and {element.tDeaths} deaths
                                    </div>
                                    <div className="numbers">
                                        <div className="stat infected">
                                            <div className="stat-content">
                                                Confirmed
                                            </div>
                                            <div className="stat-content">
                                                {element.lConfirmed}
                                            </div>
                                        </div>
                                        <div className="stat recovered">
                                            <div className="stat-content">
                                                Recovered
                                            </div>
                                            <div className="stat-content">
                                                {element.lRecovered}
                                            </div>
                                        </div>
                                        <div className="stat dead">
                                            <div className="stat-content">
                                                Deaths
                                            </div>
                                            <div className="stat-content">
                                                {element.lDeaths}
                                            </div>
                                        </div>
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
