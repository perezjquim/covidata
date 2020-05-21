import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import NavBar from './NavBar';
import Indications from './Indications';
import WorldMapPage from './WorldMapPage';
import Title from '../containers/Title';

const News = ({ navigator }) => (
    <Page className="background" renderBottomToolbar={() => <NavBar navigator={navigator} />}>
        <Swipeable
            style={{ width: "100%", height: "100%" }}
            onSwipedRight={() => navigator.pushPage({ component: WorldMapPage, key: 'WORLD_MAP_PAGE' })}
            onSwipedLeft={() => navigator.pushPage({ component: Indications, key: 'INDICATIONS_PAGE' })}>
            <div className="page-container" >
                <Title title="news" />
            </div>
        </Swipeable>
    </Page>
);

export default News;
