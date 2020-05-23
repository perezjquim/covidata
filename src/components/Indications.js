import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page
} from 'react-onsenui';

import '../css/Indications.css';

import NavBar from './NavBar';
import Title from '../containers/Title';

class Indications extends React.Component {
    render() {
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
                    </div>
                </Swipeable>
            </Page>
        );
    }
}

export default Indications;
