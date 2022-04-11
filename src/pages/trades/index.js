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
import { Modal, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useTrade from '../../hooks/trades';

const useStyles = makeStyles({
    container: {
        width: '100%'
    }
});
const TradesComponent = (props) => {
    const [open, setOpen] = useState(false);
    const [todayTrades, updateTodayTrades] = useState([]);
    const history = useHistory();
    const [showDayTrade, updateDayTrade] = useState(false);
    const [trades, updateTrades] = useState([]);
    const userTrades = useTrade();
    
    useEffect(() => {
        if (userTrades.length === 0) return;
        updateTrades([...userTrades.filter(f => !f.tradeDate)]);
        showTodayTrades([...userTrades.filter(f => !f.tradeDate)]);
    }, [userTrades]);
    const deleteTrade = async (id) => {
        const modelToDelete = await DataStore.query(UserTrades, id);
        DataStore.delete(modelToDelete);
        window.location.reload();
    };

  
    const handleClose = () => {
      setOpen(false);
    };
    const updateField = (value) => {
        updateDayTrade(true);
        updateTodayTrades(trades.filter(f => f.createdDate === value));
    }
const classes = useStyles();
const showTodayTrades = (loadedTrades) => {
    updateDayTrade(true);
    if (loadedTrades) {
        updateTodayTrades(loadedTrades.filter(f => moment(f.createdDate).format('DD MMM, yyyy') === moment().format('DD MMM, yyyy')));
        return;
    }
    updateTodayTrades(trades.filter(f => moment(f.createdDate).format('DD MMM, yyyy') === moment().format('DD MMM, yyyy')));
};

const editTrade = (row) => {
    history.push({
        pathname: `/trade/edit/${row.id}`,
        state: {
            item: row,
            quantity: row.quantity,
            price: row.price
        }
    })
};

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
                            <Button onClick={showTodayTrades}>Today Orders</Button>
                            <TextField
                                    label="Created Date"
                                    type="date"
                                    name="createdDate"
                                    defaultValue={moment().format("yyyy-MM-DD")}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => updateField(e.target.value)}
                                />
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
                                    {showDayTrade ? (
                                        <>
                                            {todayTrades.map((row) => (
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
                                                    <Button onClick={() => editTrade(row)}>Edit</Button>
                                                    <Button variant="outlined" onClick={() => history.push({ pathname: `/trade/complete/${row.id}`, state: { item: row, quantity: row.quantity, price: (row.price * 1.03).toFixed(2) }})} >Complete</Button>
                                                    <Button variant="icon" onClick={() => deleteTrade(row.id)} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>) : (
                                        <>
                                        {trades.map((row) => (
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
                                        <Button onClick={() => editTrade(row)}>Edit</Button>
                                        <Button variant="outlined" onClick={() => history.push({ pathname: `/trade/complete/${row.id}`, state: { item: row, quantity: row.quantity, price: (row.price * 1.03).toFixed(2) }})} >Complete</Button>
                                        <Button variant="icon" onClick={() => deleteTrade(row.id)} >Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid>
                    <Paper>
                        <Title>Stats</Title>
                        <div>
                            <h3>Total Buy Amount</h3>
                            <span>{todayTrades.reduce((a,b) => a+b.totalAmount, 0)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Container>    
        </AppLayout>
    )
}

export default TradesComponent;
