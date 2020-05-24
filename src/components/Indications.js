import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page,
    List,
    ListItem
} from 'react-onsenui';

import DownArrowIcon from '../icons/down-arrow.svg';
import UpArrowIcon from '../icons/up-arrow.svg';

import '../css/Indications.css';

import NavBar from './NavBar';
import Title from '../containers/Title';

class Indications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    handleClick(el, index) {
        var content = document.getElementById("content-" + index);
        var icon = document.getElementById("icon-" + index);
        if (content.style.display === "block") {
            content.style.display = "none";
            icon.src = DownArrowIcon;
        } else {
            content.style.display = "block";
            icon.src = UpArrowIcon;
        }
    }

    render() {
        const placeholderItem = [
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
            { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum vel ex vel mattis. Fusce bibendum et eros at finibus. Pellentesque id feugiat nisi. Maecenas pharetra euismod quam at molestie. Sed laoreet id ipsum nec dignissim. Sed ipsum lorem, consequat eget ligula in, porttitor aliquam lacus. Phasellus est nulla, malesuada quis ultricies pretium, vehicula in ligula." },
        ];

        let { navigator, currentPage } = this.props;

        return (
            <Page className="background indications-page-container"
                renderBottomToolbar={() => <NavBar
                    navigator={navigator}
                    currentPage={currentPage} />
                }
            >
                <Swipeable
                    style={{ width: "100%", height: "100%" }}
                    onSwipedRight={() => navigator.popPage()}>
                    <div className="page-container" >
                        <Title title="indications" />

                        <div className="indications-container">
                            <List
                                dataSource={placeholderItem}
                                renderRow={(element, idx) => (
                                    <ListItem modifier={idx === placeholderItem.length - 1 ? 'longdivider' : null}>
                                        <div className="indication">
                                            <div className="indication-title" onClick={() => this.handleClick(element, idx)}>
                                                {element.title}
                                                <div className="indication-icon">
                                                    <img src={DownArrowIcon} id={"icon-" + idx} />
                                                </div>
                                            </div>
                                            <div className="indication-content" id={"content-" + idx}>
                                                {element.content}
                                            </div>
                                        </div>
                                    </ListItem>
                                )}
                            />
                        </div>
                    </div>
                </Swipeable>
            </Page>
        );
    }
}

export default Indications;
