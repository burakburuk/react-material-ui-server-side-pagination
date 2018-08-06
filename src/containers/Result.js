import React, {Component} from 'react';
import {connect} from 'react-redux';
import ResultTable from '../components/ResultTable';
import {handleChangeRowsPerPage, handleChangePage} from '../actions';

class Result extends Component {
    handleChangePage = (event, page) => {
        this.props.handleChangePage(page);
    };

    handleChangeRowsPerPage = event => {
        this.props.handleChangeRowsPerPage(event);
    };

    render() {
        const {resultTableState} = this.props;
        return (
            <ResultTable resultTableState={resultTableState} handleChangePage={this.handleChangePage}
                         handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
        )
    }
}

const mapStateToProps = (state) => ({
    resultTableState: state.get('resultTable')
});

const mapDispatchToProps = (dispatch) => ({
    handleChangeRowsPerPage: (event) => dispatch(handleChangeRowsPerPage(event)),
    handleChangePage: (event) => dispatch(handleChangePage(event)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Result);
