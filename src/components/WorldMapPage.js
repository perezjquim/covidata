import React from 'react';

import {
    Page
} from 'react-onsenui';

import NavBar from './NavBar';
import MainPage from './MainPage';

const WorldMapPage = ({ navigator }) => (
    <Page className="background" renderBottomToolbar={() => <NavBar title='Onsen Weather' navigator={navigator} />}>
        <div>
            <h1 onClick={() => {
                navigator.pushPage({ component: MainPage });
            }}>WorldMap</h1>
        </div>
    </Page>
);

export default WorldMapPage;
