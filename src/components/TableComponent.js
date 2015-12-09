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
        this.state = {data: this.props.data, _data: this.props.data};
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
        if(!row) { return <tr></tr>; }
        return <RowComponent
            header={true}
            validColumns={this.props.validColumns} {...row} />
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.data === this.props.data) { return; }
        this.setState({data: nextProps.data, _data: nextProps.data});
    }

    search(e) {
        let dataArr = [];
        const regExp = new RegExp(e.target.value, 'gi');
        this.state._data.forEach((data) => {
            let valid = false;
            for(let k in data) {
                if(this.props.validColumns.indexOf(k) < 0) { continue; }
                if((typeof data[k] === 'string' || data[k] === 'number')  &&
                data[k].match(regExp)) {
                    valid = true; break;
                }
            }

            if(valid) { dataArr.push(data); }
        });

        this.setState({data: dataArr});
    }

    render() {
        return (
            <div className="table-component">
                <input
                    ref="search"
                    type="text"
                    placeholder="Search..."
                    onChange={ this.search.bind(this) }/>
                <table>
                    <thead>
                        {this.renderHeader()}
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
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
