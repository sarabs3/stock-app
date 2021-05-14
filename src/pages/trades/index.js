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
import { Modal } from '@material-ui/core';
const TradesComponent = () => {
    const [open, handleOpen] = useState(false);
    const [trades, updateTrades] = useState([
        {
            id:1,
            tradeInitDate: new Date(),
            scripName: "ITC",
            action: "Buy",
            quantity: "200",
            buyPrice: "204",
            sellPrice: "",
            totalAmount: "",
            profit: "",
        }
    ]);
    useEffect(() => {
        async function fetchData() {
        const models = await DataStore.query(Trades);
        console.log("models", models)
        // updateTrades(models);
        }
        fetchData()
    }, []);
const classes = {}
const body = (
    <div >
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
    return (
        <AppLayout pageName="Trades">
            <Container maxWidth="lg" className={classes.container}>
            
            <Modal
            open={open}
            onClose={() => handleOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >{body}
            </Modal>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper>
                            <Title>Recent Trades</Title>
                            <Button onClick={() => handleOpen(true)} variant="contained" color="primary">Add Trade</Button>
                            <Table size="small">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Scrip Name</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Buy Price</TableCell>
                                    <TableCell>Targets</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Profit</TableCell>
                                    <TableCell align="right">&nbsp;</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {trades && trades.map((row) => (
                                    <TableRow key={row.id}>
                                    <TableCell>{moment(row.tradeInitDate).format('d MMM, yyyy')}</TableCell>
                                    <TableCell>{row.scripName}</TableCell>
                                    <TableCell>{row.action}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.buyPrice}</TableCell>
                                    <TableCell>{row.buyPrice * 1.03}</TableCell>
                                    <TableCell>{row.buyPrice * row.quantity}</TableCell>
                                    <TableCell>{(row.quantity * (row.buyPrice * 1.03 - row.buyPrice)).toFixed(2)}</TableCell>
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
