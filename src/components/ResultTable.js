import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ResultTableActions from './ResultTableActions';
import {format} from 'currency-formatter';

const styles = theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


const ResultTable = (props) => {
    const {
        classes, resultTableState, handleChangePage, handleChangeRowsPerPage
    } = props;
    const emptyRows = resultTableState.get('rowsPerPage') - Math.min(resultTableState.get('rowsPerPage'),
        resultTableState.get('data').toJS().length);

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Listing id</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Bedrooms</TableCell>
                            <TableCell>Property Type</TableCell>
                            <TableCell>Agent Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resultTableState.get('data').toJS().map(n => {
                            return (
                                <TableRow key={n.listingId}>
                                    <TableCell component="th" scope="row">{n.listingId}</TableCell>
                                    <TableCell numeric>{format(n.price, {code: 'GBP'})}</TableCell>
                                    <TableCell numeric>{n.bedrooms}</TableCell>
                                    <TableCell>{n.propertyType}</TableCell>
                                    <TableCell>{n.agentName}</TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 48 * emptyRows}}>
                                <TableCell colSpan={5}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                count={resultTableState.get('resultCount')}
                                rowsPerPage={resultTableState.get('rowsPerPage')}
                                page={resultTableState.get('page')}
                                backIconButtonProps={{
                                    disabled: resultTableState.get('isDisabled')
                                }}
                                nextIconButtonProps={{
                                    disabled: resultTableState.get('isDisabled')
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={ResultTableActions}
                                rowsPerPageOptions={resultTableState.get('rowsPerPageOptions').toJS()}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </Paper>
    );
};

ResultTable.defaultProps = {
    handleChangePage: () => {
        throw new Error("handleChangePage is not implemented!");
    },
    handleChangeRowsPerPage: () => {
        throw new Error("handleChangeRowsPerPage is not implemented!");
    }
};

ResultTable.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default withStyles(styles)(ResultTable);
