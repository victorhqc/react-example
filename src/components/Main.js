require('normalize.css');
require('styles/App.css');

import React from 'react';
import TableComponent from './TableComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

    render() {
        return (
            <div className="main_component">
                <TableComponent />
            </div>
        );
    }
}

AppComponent.defaultProps = {
    something: 'cool'
};

    export default AppComponent;
