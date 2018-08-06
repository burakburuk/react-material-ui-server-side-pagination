import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LocationAutoComplete from './LocationAutoComplete';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import objectHash from 'object-hash';

const styles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit * 3,
    },
    button: {
        marginTop: 27,
        display: 'inline-flex',
        margin: theme.spacing.unit,
    },
    formControl: {
        marginTop: 16,
        width: 200,
        float: 'right',
        marginRight: -35,
    },
    messageBox: {
        width: 200,
    }
});

const sortList = [
    {value: "listing_id-ascending", label: "Listing Id"},
    {value: "price-ascending", label: "Price Ascending"},
    {value: "price-descending", label: "Price Descending"}
];

const FilterBox = (props) => {
    const {
        classes, filterBoxState, onSubmit, onFilterMinBedsFieldChange,
        onFilterMinPriceFieldChange, onLocationChange, onSelectionComplete,
        onMessageBoxClose, onSortByChange
    } = props;
    return (
        <div className={classes.root}>
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <LocationAutoComplete
                            error={filterBoxState.get('locationError')}
                            disabled={filterBoxState.get('isDisabled')}
                            label="Location"
                            value={filterBoxState.get('selectedLocation').toJS()}
                            suggestions={filterBoxState.get('suggestions').toJS()}
                            onChange={onLocationChange}
                            onSelectionComplete={onSelectionComplete}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth
                                   error={filterBoxState.get('minPriceError')}
                                   disabled={filterBoxState.get('isDisabled')}
                                   label="Min Price"
                                   value={filterBoxState.get('minPrice')}
                                   type="number"
                                   margin="normal"
                                   onChange={(e) => onFilterMinPriceFieldChange({
                                       "property": "minPrice",
                                       "value": e.target.value
                                   })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth
                                   error={filterBoxState.get('minBedsError')}
                                   disabled={filterBoxState.get('isDisabled')}
                                   label="Min Beds"
                                   value={filterBoxState.get('minBeds')}
                                   type="number"
                                   margin="normal"
                                   onChange={(e) => onFilterMinBedsFieldChange({
                                       "property": "minBeds",
                                       "value": e.target.value
                                   })}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={onSubmit}
                                disabled={filterBoxState.get('isDisabled')}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-readonly">Sort By</InputLabel>
                            <Select
                                disabled={filterBoxState.get('isDisabled')}
                                value={filterBoxState.get('sortBy')}
                                onChange={(e) => onSortByChange(e)}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    sortList.map(item => {
                                        return (
                                            <MenuItem key={objectHash(item)} value={item.value}>{item.label}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={filterBoxState.get('messageBoxOpen')}
                onClose={() => onMessageBoxClose()}
                message={<span id="message-id">Please fill all the fields!</span>}
            />
        </div>
    );
};

FilterBox.defaultProps = {
    onSubmit: () => {
        throw new Error("onSubmit is not implemented!");
    },
    onMessageBoxClose: () => {
        throw new Error("onMessageBoxClose is not implemented!");
    }
};

FilterBox.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onMessageBoxClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterBox);
