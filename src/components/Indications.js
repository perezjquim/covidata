import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import NavBar from './NavBar';
import News from './News';

const Indications = ({ navigator }) => (
    <Page className="background" renderBottomToolbar={() => <NavBar title='Onsen Weather' navigator={navigator} />}>
        {console.log(navigator)}
        <div>
            <Swipeable
                style={{ border: "1px solid red", width: "50vh", height: "99vh" }}
                onSwipedRight={() => navigator.pushPage({ component: News, key: 'NEWS_PAGE' })}>
                <h1>Indications</h1>
            </Swipeable>
        </div>
    </Page>
);

export default Indications;
