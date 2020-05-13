import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import NavBar from './NavBar';
import Indications from './Indications';
import WorldMapPage from './WorldMapPage';

const News = ({ navigator }) => (
    <Page className="background" renderBottomToolbar={() => <NavBar title='Onsen Weather' navigator={navigator} />}>
        {console.log(navigator)}
        <div>
            <Swipeable
                style={{ border: "1px solid red", width: "50vh", height: "99vh" }}
                onSwipedRight={() => navigator.pushPage({ component: WorldMapPage, key: 'WORLD_MAP_PAGE' })}
                onSwipedLeft={() => navigator.pushPage({ component: Indications, key: 'INDICATIONS_PAGE' })}>
                <h1>News</h1>
            </Swipeable>
        </div>

    </Page>
);

export default News;
