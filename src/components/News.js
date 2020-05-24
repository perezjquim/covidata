import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import '../css/News.css';

import NavBar from './NavBar';
import Indications from './Indications';
import Title from '../containers/Title';

class News extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewsClick = this.handleNewsClick.bind(this);
    }

    handleNewsClick(el) {
        let url = encodeURI("https://www.bbc.com/news/world-africa-52791780");

        window.open(url, "_blank");
    }

    render() {
        const placeholderItem = {
            0: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            2: { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/768px-Fox_News_Channel_logo.svg.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            3: { img: "https://www.freepnglogos.com/uploads/cnn-logo-tv-channel-png-13.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            4: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            1: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            5: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            6: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            7: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            8: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            9: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            10: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            11: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            12: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            13: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            14: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            15: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            16: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            17: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            18: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
            19: { img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png", date: "Lorem", title: "lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula. " },
        };

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

                    onSwipedLeft={() => navigator.pushPage({ component: Indications, key: this.props.nextPage })}>
                    <div className="page-container" >
                        <Title title="news" />
                        <div className="news-container" >
                            {Object.values(placeholderItem).map((element, index) => {
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
                                                {index} minutes ago
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
