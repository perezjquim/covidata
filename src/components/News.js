import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import '../css/News.css';

import NavBar from './NavBar';
import Indications from './Indications';
import Title from '../containers/Title';

import NewsAPIHelper from '../util/api/News';

class News extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewsClick = this.handleNewsClick.bind(this);
        this.state = { news: [] };
    }

    handleNewsClick(el) {
        let url = encodeURI(el.url);

        window.open(url, "_blank");
    }

    async componentDidMount() {
        const oData = await NewsAPIHelper.getGlobalNews();
        const oNews = oData.news;
        const oCurrentDate = new Date();
        const iCurrentTime = oCurrentDate.getTime();
        const oNewsMapped = oNews.map((aEntry) => {
            const oImages = aEntry.images;
            const sImg = oImages && oImages[0].url;
            const sDate = aEntry.publishedDateTime.substr(0, 10);
            const oPublishDate = new Date(aEntry.publishedDateTime);
            const iPublishTime = oPublishDate.getTime();
            const iDiffMsec = iCurrentTime - iPublishTime;
            const iMinutesAgo = Math.round(iDiffMsec / 60000);
            return {
                img: sImg,
                date: sDate,
                title: aEntry.title,
                content: aEntry.excerpt,
                url: aEntry.webUrl,
                minutesAgo: iMinutesAgo
            };
        });
        this.setState({ news: oNewsMapped });
    }

    render() {
        let { navigator, currentPage } = this.props;

        return (
            <Page className="background news-page-container"
                renderBottomToolbar={() => <NavBar
                    navigator={navigator}
                    currentPage={currentPage} />
                }
            >
                <Swipeable
                    style={{ width: "100%", height: "100%" }}
                    onSwipedRight={() => navigator.popPage()}

                    onSwipedLeft={() => navigator.pushPage({ component: Indications, key: this.props.pages[3].name })}>
                    <div className="page-container" >
                        <Title title="notícias" />
                        <div className="news-container" >
                            {Object.values(this.state.news).map((element, index) => {
                                return (
                                    <div
                                        className="news"
                                        onClick={() => this.handleNewsClick(element)}
                                    >
                                        <div className="news-img">
                                            <img src={element.img} />
                                        </div>

                                        <div className="news-text">
                                            <div className="news-title">
                                                {element.title}
                                            </div>
                                            <div className="news-content">
                                                {element.content}
                                            </div>
                                            <div className="news-date">
                                                {element.minutesAgo} minutes ago
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </Swipeable>
            </Page>
        );
    }
}

export default News;
