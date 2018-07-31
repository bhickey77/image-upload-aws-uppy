import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NewCard from '../NewCard/NewCard';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 365,
      width: 300,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });
  

class CardsGrid extends Component {
    state = {
        spacing: '16',
      };
    
    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={32}>
            <Grid item xs={12}>
              <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                {[0, 1, 2].map(value => (
                  <Grid key={value} item>
                    <Paper className={classes.paper} >
                        <NewCard />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );
    }
}

CardsGrid.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CardsGrid);