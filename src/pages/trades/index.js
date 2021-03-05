import {useEffect, useState} from 'react';
import AppLayout from "../../components/layout/AppLayout";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../../components/Title';
import moment from 'moment';
import { DataStore } from '@aws-amplify/datastore';
import { Trades } from '../../models';
const TradesComponent = () => {
    const [trades, updateTrades] = useState([]);
    useEffect(
    async () => {
      const models = await DataStore.query(Trades);
      updateTrades(models);
    },
    []
);
const classes = {}
    return (
        <AppLayout pageName="Trades">
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper>
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
                                    <TableCell>Profit</TableCell>
                                    <TableCell align="right">&nbsp;</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {trades && trades.map((row) => (
                                    <TableRow key={row.id}>
                                    <TableCell>{moment(row.buyDate).format('d MMM, yyyy')}</TableCell>
                                    <TableCell>{row.scripName}</TableCell>
                                    <TableCell>{row.action}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.profit}</TableCell>
                                    <TableCell align="right">
                                        <Button>Edit</Button>
                                        <Button>Delte</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>    
        </AppLayout>
    )
}

export default TradesComponent;
