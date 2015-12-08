'use strict';

import React from 'react';

require('styles//Table.css');

class RowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {columns: this.props};
    }

    renderColumns() {
        return Object.keys(this.state.columns).map((prop, i) => {
            if(this.props.header &&
                prop === 'header'
            ) { return; }

            if(this.props.validColumns.indexOf(prop) < 0) { return; }

            if(this.props.header) {
                return <th key={'header-' + i}>{prop}</th>;
            }

            return <td key={'column-' + i}>{this.state.columns[prop]}</td>
        });
    }

    render() {
        return (<tr>{this.renderColumns()}</tr>);
    }
}

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
    }

    renderRows() {
        return this.state.data.map((row, i) => {
            return <RowComponent
                key={i}
                validColumns={this.props.validColumns}
                {...row} />;
        });
    }

    renderHeader() {
        const row = this.state.data[0];
        return <RowComponent
            header={true}
            validColumns={this.props.validColumns} {...row} />
    }

    render() {
        return (
            <table className="table-component">
                <thead>
                    {this.renderHeader()}
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}

TableComponent.displayName = 'TableComponent';

// Uncomment properties you need
// TableComponent.propTypes = {};
TableComponent.defaultProps = {
    validColumns: ['brand', 'company'],
    data: [
        {brand: 'Dell', company: 'iTexico', hidden: 'Something hidden'},
        {brand: 'Apple', company: 'iTexico', hidden: 'Something hidden'},
        {brand: 'HP', company: 'Microsoft', hidden: 'Something hidden'}
    ]
};

export default TableComponent;
