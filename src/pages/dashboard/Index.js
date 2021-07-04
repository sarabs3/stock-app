import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades } from '../../models';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import AppLayout from '../../components/layout/AppLayout';
import _gropuBy from 'lodash/groupBy';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function createStats (values) {
  return Object.keys(values).map(val => ({
    name: val,
    trades: values[val].length,
    quantity: values[val].reduce((a,c) => a + c.quantity, 0),
    amount: values[val].reduce((a,c) => a + c.totalAmount, 0),
  }))
}

export default function Dashboard() {
  const [holdings, setHoldings] = useState([]);
    
  const fetchScripts = async () => {
      const models = await DataStore.query(UserTrades);
      return models;
  }
  useEffect(
    () => {
      fetchScripts().then(data => {
        const groupValues = _gropuBy(data, (d) => d.Scrips.symbol);
        setHoldings([...createStats(groupValues)]);
      })
    },
    []
  );
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <AppLayout pageName="Dashboard">
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders trades={trades} /> */}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                        <TableCell>Scrip Name</TableCell>
                        <TableCell>Total Trades</TableCell>
                        <TableCell>Total Quantity</TableCell>
                        <TableCell>Price Per Share</TableCell>
                        <TableCell>Total Amount</TableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                    {holdings.length > 0 && holdings.map(stat => (
                      <TableRow key={stat.name}>
                        <TableCell>{stat.name}</TableCell>
                        <TableCell>{stat.trades}</TableCell>
                        <TableCell>{stat.quantity}</TableCell>
                        <TableCell>{(stat.amount / stat.quantity).toFixed(2)}</TableCell>
                        <TableCell>{stat.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
    </AppLayout>
  );
}
