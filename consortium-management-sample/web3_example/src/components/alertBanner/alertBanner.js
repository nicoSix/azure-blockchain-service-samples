import React from 'react';
import './alertBanner.css';

const AlertBanner = props => (
    <div id="alertBanner" className={`alertWrapper ${(props.display) ? 'hide' : ''}`}>
        <div className={`alert center-block alertContent ${props.type}`}>
            {props.content}
        </div>
    </div>    
)

export default AlertBanner;