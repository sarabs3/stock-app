import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "../../components/Title";
import moment from "moment";
import { TextField } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import TradeTable from "./TradesTable";
import useTrade from "../../hooks/trades";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
});
const CompletedTrades = (props) => {
  const [open, setOpen] = useState(false);
  const [todayTrades, updateTodayTrades] = useState([]);
  const [showDayTrade, updateDayTrade] = useState(false);
  const [trades, updateTrades] = useState([]);
  const userTrades = useTrade();

  const updateField = (value) => {
    updateDayTrade(true);
    updateTodayTrades(trades.filter((f) => f.tradeDate === value));
  };
  useEffect(() => {
    if (userTrades.length === 0) return;
    updateTrades([...userTrades.filter((f) => f.tradeDate)]);
    showTodayTrades([...userTrades.filter((f) => f.tradeDate)]);
  }, [userTrades]);

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const showTodayTrades = (loadedTrades) => {
    updateDayTrade(true);
    if (loadedTrades) {
      updateTodayTrades(
        loadedTrades.filter(
          (f) =>
            moment(f.tradeDate).format("DD MMM, yyyy") ===
            moment().format("DD MMM, yyyy")
        )
      );
      return;
    }
    updateTodayTrades(
      trades.filter(
        (f) =>
          moment(f.tradeDate).format("DD MMM, yyyy") ===
          moment().format("DD MMM, yyyy")
      )
    );
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

  const totalProfit = todayTrades.reduce((a, b) => a + b.expectedProfit, 0);
  const totalAmount = todayTrades.reduce((a, b) => a + b.totalAmount, 0);
  const percentageProfit = parseFloat(
    (totalProfit / totalAmount) * 100
  ).toFixed(2);
  return (
    <AppLayout pageName="Trades">
      <Container className={classes.container}>
        {renderTradeModal()}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <Paper>
              <Title>Recent Trades</Title>
              <Button
                onClick={() => props.history.push("/trade/add")}
                variant="contained"
                color="primary"
              >
                Add Trade
              </Button>
              <Button
                onClick={() => props.history.push("/trade")}
                variant="contained"
              >
                View Trades
              </Button>
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
                    <TableCell>Buy Date</TableCell>
                    <TableCell>Scrip Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Buy Price</TableCell>
                    <TableCell>Sell Price</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Profit</TableCell>
                    <TableCell>Sell Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showDayTrade ? (
                    <>
                      {todayTrades.length > 0 &&
                        todayTrades.map((row) => (
                          <TradeTable
                            data={row}
                            key={row.id}
                            history={props.history}
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      {trades &&
                        trades.map((row) => (
                          <TradeTable
                            data={row}
                            key={row.id}
                            history={props.history}
                          />
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
              <span>{totalProfit}</span>
            </div>
            <div>
              <h3>Total Amount</h3>
              <span>{totalAmount}</span>
            </div>
            <div>
              <h3>% Profit</h3>
              <span>{percentageProfit}%</span>
            </div>
          </Paper>
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default CompletedTrades;
