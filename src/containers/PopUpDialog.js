import React, { Component } from 'react';

import '../css/PopUp.css';

import { Dialog } from 'react-onsenui';

class PopUpDialog extends Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel() {
        this.props.handleCloseBookmark();
    }

    render() {
        const { visible } = this.props;

        return (
            <Dialog
                className="home-page-dialog"
                onCancel={this.handleCancel}
                isOpen={visible}
                style={{ height: "100vh" }}
                cancelable
                animationOptions={{ duration: 0.2, timing: 'ease-in-out' }}>

                <div className="popup-container">
                    {this.props.children}
                </div>

            </Dialog>
        );
    };
}

export default PopUpDialog;
