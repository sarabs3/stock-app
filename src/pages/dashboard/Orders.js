import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, action, quantity, amount, price, profit) {
  return { id, date, name, action, quantity, amount, price, profit };
}

const rows = [
  createData(0, '16 Mar, 2019', 'TCS', 'Buy', '100', 312.44, 100, 1000),
  createData(1, '16 Mar, 2019', 'Sun Pharma', 'Buy', '150', 866.99, 100, 1000),
  createData(2, '16 Mar, 2019', 'SBI', 'Sell', '200', 100.81, 100, 1000),
  createData(3, '16 Mar, 2019', 'HCL Tech', 'Sell', '120', 654.39, 100, 1000),
  createData(4, '15 Mar, 2019', 'Tata Motors', 'Sell', '40', 212.79, 100, 1000),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Trades</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Scrip Name</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.action}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">{row.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/trade">
          See more trades
        </Link>
      </div>
    </React.Fragment>
  );
}
