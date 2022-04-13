import { Button, Card, CardActions, CardContent, CardHeader, Container, List, ListItem, Table, TableCell, TableRow } from '@material-ui/core';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { UserTrades } from '../../models';

const ViewTrade = ({match, history}) => {
    const [trade, setTrade] = useState({});

    useEffect(() => {
        async function getTradeDetails(id) {
            const models = await DataStore.query(UserTrades, id);
            setTrade(models);
        }
        if (match?.params?.id) {
            getTradeDetails(match?.params?.id)
        }
    }, [match?.params?.id]);

    const editTrade = () => {
        history.push({
            pathname: `/trade/edit/${trade.id}`,
            state: {
                item: trade,
                quantity: trade.quantity,
                price: trade.price
            }
        })
    };
    const completeTrade = () => {
        history.push({
            pathname: `/trade/complete/${trade.id}`,
            state: {
                item: trade,
                quantity: trade.quantity,
                price: (trade.price * 1.03).toFixed(2) }
            })
    }
    const deleteTrade = async () => {
        const modelToDelete = await DataStore.query(UserTrades, trade.id);
        DataStore.delete(modelToDelete);
        history.push("/trade");
    };
    return (
        <AppLayout>
            <Container>
                <Card>
                    <CardHeader title="View Trade" />
                    <CardContent>
                        <Table type="striped">
                            <TableRow>
                                <TableCell>Created Date:</TableCell>
                                <TableCell>{trade.createdDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stock Name: </TableCell>
                                <TableCell>{trade.Scrips?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity: </TableCell>
                                <TableCell>{trade.quantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Price: </TableCell>
                                <TableCell>{trade.price}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Trade Date: </TableCell>
                                <TableCell>{trade.tradeDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Sell Price: </TableCell>
                                <TableCell>{trade.target}</TableCell>
                            </TableRow>
                        </Table>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={editTrade}>Edit</Button>
                    <Button size="small" onClick={completeTrade}>Complete</Button>
                    <Button size="small" onClick={deleteTrade}>Delete</Button>
                </CardActions>

                </Card>
            </Container>
        </AppLayout>
    )
};

export default ViewTrade;
