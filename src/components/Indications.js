import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import '../css/Indications.css';

import NavBar from './NavBar';
import News from './News';
import Title from '../containers/Title';

const Indications = ({ navigator }) => (
    <Page className="background indications-page-container" renderBottomToolbar={() => <NavBar navigator={navigator} />}>
        <Swipeable
            style={{ width: "100%", height: "100%" }}
            onSwipedRight={() => navigator.pushPage({ component: News, key: 'NEWS_PAGE' })}>
            <div className="page-container" >
                <Title title="indications" />
            </div>
        </Swipeable>
    </Page>
);

export default Indications;
