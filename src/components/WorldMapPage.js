import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import NavBar from './NavBar';
import MainPage from './MainPage';
import News from './News';

const WorldMapPage = ({ navigator }) => (
    <Page className="background" renderBottomToolbar={() => <NavBar title='Onsen Weather' navigator={navigator} />}>
        {console.log(navigator)}
        <div>
            <Swipeable
                style={{ border: "1px solid red", width: "50vh", height: "99vh" }}
                onSwipedRight={() => navigator.pushPage({ component: MainPage, key: 'MAIN_PAGE' })}
                onSwipedLeft={() => navigator.pushPage({ component: News, key: 'NEWS_PAGE' })}>
                <h1>World Map</h1>
            </Swipeable>
        </div>
    </Page>
);

export default WorldMapPage;
