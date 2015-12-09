'use strict';

import React from 'react';

require('styles/activities/Main.css');

import ActivityModel from '../../models/activity';
const activity = new ActivityModel();

class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activities: []}
    }

    componentDidMount() {
        // Async
        activity.find(this.props.filter)
        .then((data) => this.props.getData(data) )
        .catch((e) => this.props.handleError(e) );
    }

    render() {
        return (
            <div className="main-component">
                <h1>Hello world!</h1>
            </div>
        );
    }
}

MainComponent.displayName = 'ActivitiesMainComponent';

// Uncomment properties you need
// MainComponent.propTypes = {};
MainComponent.defaultProps = {
    filter: {},
    getData: function(){},
    handleError: function(){}
};

export default MainComponent;
