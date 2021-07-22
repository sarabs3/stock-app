import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
const TradeTable = ({data}) => {
    return (
        <TableRow style={{ backgroundColor: data.tradeDate ? 'green' : ''}}>
            <TableCell>{moment(data.createdDate).format('DD MMM, yyyy')}</TableCell>
            <TableCell>{data?.Scrips?.name}</TableCell>
            <TableCell>{data.action}</TableCell>
            <TableCell>{data.quantity}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell>{data.target}</TableCell>
            <TableCell>{data.totalAmount}</TableCell>
            <TableCell>{data.expectedProfit}</TableCell>
            <TableCell>{moment(data.tradeDate).format('DD MMM, yyyy')}</TableCell>
        </TableRow>
    );
};
export default TradeTable;
