<<<<<<< HEAD
import { Component, useEffect, useState } from 'react';
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

import { DataGrid } from '@material-ui/data-grid';
import { head, keys } from 'lodash';
import { RowingTwoTone } from '@material-ui/icons';
import { number } from 'prop-types';
=======
import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "../../components/Title";
import moment from "moment";
import { DataStore } from "@aws-amplify/datastore";
import { UserTrades } from "../../models";
import { Modal, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useTrade from "../../hooks/trades";

import { DataGrid } from "@material-ui/data-grid";
import { number } from "prop-types";
>>>>>>> 973b01d1045d667f8ab0cef30737ce7d5cc5f6d4

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
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
    updateTrades([...userTrades.filter((f) => !f.tradeDate)]);
    showTodayTrades([...userTrades.filter((f) => !f.tradeDate)]);
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
    updateTodayTrades(trades.filter((f) => f.createdDate === value));
  };
  const classes = useStyles();

  const rows = trades.map((row, index) => {
    return {
      id: index + 1,
      key: row.id,
      date: moment(row.createdDate).format("DD MMM, yyyy"),
      scrip: row.Scrips?.name,
      action: row.action,
      quantity: row.quantity,
      buyPrice: row.buyPrice,
      target: row.target,
      totalAmount: row.totalAmount,
      expectedProft: row.expectedProft,
    };
<<<<<<< HEAD
    const updateField = (value) => {
        updateDayTrade(true);
        updateTodayTrades(trades.filter(f => f.createdDate === value));
    }
    const classes = useStyles();
    const showTodayTrades = () => {
        updateDayTrade(true);
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
const renderEditButton = (row) => {
    return <Button onClick={() => editTrade(row)}>Edit</Button>
}
const rows=  trades.map((row,index) => {

    return{
            id :index+1,
            key:row.id,
            date:moment(row.createdDate).format('DD MMM, yyyy'),
            scrip:row.Scrips?.name,
            action:row.action,
            quantity:row.quantity,
            buyPrice:row.buyPrice,
            target:row.target,
            totalAmount:row.totalAmount,
            expectedProft:row.expectedProft
    }
    })
    const columns = [
        {
            field:"id",
            headerName:"ID",
            type:"id",
            width:70,


        },

        {
            
            field: 'date',
            headerName: 'Date',
            type:"date",
            width: 130,
            editable: false,
        },
        {
            field: 'scrip',
            headerName: 'Scrip',
            width: 130,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            editable: false,

        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type:number,
            width: 130,
            editable: false,
        },
        {
            field: 'buyprice',
            headerName: 'Buy price',
            type: number,
            width: 130,
            editable: false,
        },
        {
            field: 'target',
            headerName: 'Target',
            type:number,
            width: 130,
            editable: false,

        },
        {
            field: 'totalAmount',
            headerName: 'Total Amount',
            type:number,
            width: 150,
            editable: false,
        },
        {
            field: 'expectedProfit',
            headerName: 'Expected Profit',
            type :number,
            width: 150,
            editable: false,
        },

       
    ];


    const completeTrade = () => {}
   



    return (
        <AppLayout pageName="Trades">
            <Container className={classes.container}>
                {renderTradeModal()}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={12}>
                        <Paper>
                            <Title>Recent Trades</Title>
                            <Button style={{ 
                                marginRight:20
                            }} onClick={() => props.history.push("/trade/add")} variant="contained" color="primary">Add Trade</Button>
                           { /*<Button onClick={() => props.history.push("/trade/completed")} variant="contained">View Completed Trade</Button>*/}
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
                           

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid

                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    onRowClick={({row}) => history.push(`trades/${row?.key}`)}
                                    />
                                    </div>
                                
                        </Paper>
                    </Grid>
                </Grid>
                <Grid> 
                    <Paper>
                        <Title>Stats</Title>
                        <div>
                            <h3>Total Buy Amount</h3>
                            <span>{todayTrades.reduce((a, b) => a + b.totalAmount, 0)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Container>
        </AppLayout>
    )
}
=======
  });
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "id",
      width: 100,
    },

    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 130,
      editable: true,
    },
    {
      field: "scrip",
      headerName: "Scrip",
      width: 130,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: number,
      width: 130,
      editable: true,
    },
    {
      field: "buyprice",
      headerName: "Buy price",
      type: number,
      width: 130,
      editable: true,
    },
    {
      field: "target",
      headerName: "Target",
      type: number,
      width: 130,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      type: number,
      width: 150,
      editable: true,
    },
    {
      field: "expectedProfit",
      headerName: "Expected Profit",
      type: number,
      width: 150,
      editable: true,
    },
  ];

  const showTodayTrades = (loadedTrades) => {
    updateDayTrade(true);
    if (loadedTrades) {
      updateTodayTrades(
        loadedTrades.filter(
          (f) =>
            moment(f.createdDate).format("DD MMM, yyyy") ===
            moment().format("DD MMM, yyyy")
        )
      );
      return;
    }
    updateTodayTrades(
      trades.filter(
        (f) =>
          moment(f.createdDate).format("DD MMM, yyyy") ===
          moment().format("DD MMM, yyyy")
      )
    );
  };

  const editTrade = (row) => {
    history.push({
      pathname: `/trade/edit/${row.id}`,
      state: {
        item: row,
        quantity: row.quantity,
        price: row.price,
      },
    });
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
              <Button
                onClick={() => props.history.push("/trade/add")}
                variant="contained"
                color="primary"
              >
                Add Trade
              </Button>
              <Button
                onClick={() => props.history.push("/trade/completed")}
                variant="contained"
              >
                View Completed Trade
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

              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid>
          <Paper>
            <Title>Stats</Title>
            <div>
              <h3>Total Buy Amount</h3>
              <span>{todayTrades.reduce((a, b) => a + b.totalAmount, 0)}</span>
            </div>
          </Paper>
        </Grid>
      </Container>
    </AppLayout>
  );
};
>>>>>>> 973b01d1045d667f8ab0cef30737ce7d5cc5f6d4

export default TradesComponent;

                            
                              
                                   
                                           
                                          
                                       
                                        
                                   
                             
                                       
