import {useEffect, useState} from 'react';
import AppLayout from "../../components/layout/AppLayout";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../../components/Title';
import moment from 'moment';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades } from '../../models';
import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        width: '100%'
    }
});
const TradesComponent = (props) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
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
    
    const fetchTrades = async () => {
        const models = await DataStore.query(UserTrades);
        console.log('adadds', models)
        return models;
    }
    useEffect(() => {
        fetchTrades().then(data => {
            console.log("data data 1 2 3 4 5", data)
            updateTrades([...data.filter(f => !f.tradeDate)])
        })
        .catch((e) => {
            console.warn('unable to fetch data', e)
        });
    }, []);
    const deleteTrade = async (id) => {
        const modelToDelete = await DataStore.query(UserTrades, id);
        DataStore.delete(modelToDelete);
        window.location.reload();
    };

  
    const handleClose = () => {
      setOpen(false);
    };
const classes = useStyles();
const renderTradeModal = () => (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
        <div>   
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    </Modal>
);
    return (
        <AppLayout pageName="Trades">
            <Container className={classes.container}>
                {renderTradeModal()}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={12}>
                        <Paper>
                            <Title>Recent Trades</Title>
                            <Button onClick={() => props.history.push("/trade/add")} variant="contained" color="primary">Add Trade</Button>
                            <Button onClick={() => props.history.push("/trade/completed")} variant="contained">View Completed Trade</Button>
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
                                    <TableCell>Expected Profit</TableCell>
                                    <TableCell align="right">&nbsp;</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {trades && trades.map((row) => (
                                    <TableRow key={row.id} style={{ backgroundColor: row.tradeDate ? 'green' : ''}}>
                                    <TableCell>{moment(row.createdDate).format('DD MMM, yyyy')}</TableCell>
                                    <TableCell>{row?.Scrips?.name}</TableCell>
                                    <TableCell>{row.action}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.target}</TableCell>
                                    <TableCell>{row.totalAmount}</TableCell>
                                    <TableCell>{row.expectedProfit}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={() => history.push({ pathname: `/trade/edit/${row.id}`, state: { item: row, quantity: row.quantity, price: (row.price * 1.03).toFixed(2) }})} >Complete</Button>
                                        <Button variant="icon" onClick={() => deleteTrade(row.id)} >Delete</Button>
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
