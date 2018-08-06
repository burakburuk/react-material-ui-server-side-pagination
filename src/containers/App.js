import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Filter from './Filter';
import Result from './Result';
import '../assets/App.css';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit * 3,
    },
});

class App extends Component {
    render() {
        const {store, classes} = this.props;
        return (
            <Provider store={store}>
                <div className={classes.container}>
                    <Filter/>
                    <Result/>
                </div>
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(App));
