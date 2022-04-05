import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades } from '../../models';

const TradeTable = ({data, history}) => {
    const editTrade = (row) => {
        history.push({
            pathname: `/trade/edit/${row.id}`,
            state: {
                item: row,
                quantity: row.quantity,
                price: row.price,
                target: row.target,
            }
        })
    };
    const deleteTrade = async (id) => {
        const modelToDelete = await DataStore.query(UserTrades, id);
        DataStore.delete(modelToDelete);
        window.location.reload();
    };
    return (
        <TableRow style={{ backgroundColor: data.tradeDate ? 'green' : ''}}>
            <TableCell>{moment(data.createdDate).format('DD MMM, yyyy')}</TableCell>
            <TableCell>{data?.Scrips?.name}</TableCell>
            <TableCell>{data.quantity}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell>{data.target}</TableCell>
            <TableCell>{data.totalAmount}</TableCell>
            <TableCell>{data.expectedProfit}</TableCell>
            <TableCell>{moment(data.tradeDate).format('DD MMM, yyyy')}</TableCell>
            <TableCell>
                <Button onClick={() => editTrade(data)}>Edit</Button>
                <Button variant="icon" onClick={() => deleteTrade(data.id)} >Delete</Button>                                    
            </TableCell>
        </TableRow>
    );
};
export default TradeTable;
