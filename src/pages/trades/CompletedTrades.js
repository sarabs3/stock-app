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
import { TextField } from '@material-ui/core';
import { UserTrades } from '../../models';
import { Modal } from '@material-ui/core';
import TradeTable from './TradesTable';

const useStyles = makeStyles({
    container: {
        width: '100%'
    }
});
const CompletedTrades = (props) => {
    const [open, setOpen] = useState(false);
    const [todayTrades, updateTodayTrades] = useState([]);
    const [showDayTrade, updateDayTrade] = useState(false);
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
    
const updateField = (value) => {
    updateDayTrade(true);
    updateTodayTrades(trades.filter(f => f.tradeDate === value));
}
    const fetchTrades = async () => {
        const models = await DataStore.query(UserTrades);
        console.log('adadds', models)
        return models;
    }
    useEffect(() => {
        fetchTrades().then(data => {
            console.log("data data 1 2 3 4 5", data)
            updateTrades([...data.filter(f => f.tradeDate)])
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
const showTodayTrades = () => {
    updateDayTrade(true);
    updateTodayTrades(trades.filter(f => moment(f.tradeDate).format('DD MMM, yyyy') === moment().format('DD MMM, yyyy')));
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
                            <Button onClick={() => props.history.push("/trade")} variant="contained">View Trades</Button>
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
                                    <TableCell>Trade Date</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {showDayTrade ? (
                                    <>
                                        {todayTrades.length > 0 && todayTrades.map((row) => (
                                            <TradeTable data={row} key={row.id} />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {trades && trades.map((row) => (
                                            <TradeTable data={row} key={row.id} />
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
                            <h3>Total Profit</h3>
                            <span>{todayTrades.reduce((a,b) => a+b.expectedProfit, 0)}</span>
                        </div>
                        <div>
                            <h3>Total Amount</h3>
                            <span>{todayTrades.reduce((a,b) => a+b.totalAmount, 0)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Container>    
        </AppLayout>
    )
}

export default CompletedTrades;
