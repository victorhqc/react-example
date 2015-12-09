require('normalize.css');
require('styles/App.css');

import React from 'react';
import TableComponent from './TableComponent';
import ActivitiesComponent from './activities/MainComponent';

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activities: []}
    }

    getActivities(data) {
        this.setState({activities: data});
    }

    handleError(error) {
        console.log('error is', error);
    }

    render() {
        const filter = {
            filter: {
                include: 'employee'
            }
        };

        return (
            <div className="main_component">
                <ActivitiesComponent
                    filter={filter}
                    getData={this.getActivities.bind(this)}
                    handleError={this.handleError.bind(this)}
                    />
                <TableComponent
                    validColumns={['activityId', 'activityDate']}
                    data={this.state.activities}
                    />
            </div>
        );
    }
}

AppComponent.defaultProps = {
    something: 'cool'
};

    export default AppComponent;
