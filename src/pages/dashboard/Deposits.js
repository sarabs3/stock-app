import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';
import Title from '../../components/Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ total }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Invested</Title>
      <Typography component="p" variant="h4">
        {total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {moment().format('d MMM, yyyy')}
      </Typography>
    </React.Fragment>
  );
}
Deposits.propTypes = {
  total: PropTypes.number,
};
Deposits.defaultProps = {
  total: 0
};
