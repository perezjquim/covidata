import React from 'react';

import '../css/Title.css';

const Title = ({ title }) => (
    <div className="page-title">
        <h1 className="page-title-main">COVID</h1>
        <span className="page-title-secondary">{title}</span>
    </div>
);

export default Title;
