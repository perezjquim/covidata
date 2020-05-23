import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import NavBar from './NavBar';
import Indications from './Indications';
import Title from '../containers/Title';

class News extends React.Component {
    render() {
        let { navigator, currentPage } = this.props;

        return (
            <Page className="background "
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
                    </div>
                </Swipeable>
            </Page>
        );
    }
}

export default News;
