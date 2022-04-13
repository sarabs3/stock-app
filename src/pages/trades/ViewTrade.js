import { Button, Card, CardActions, CardContent, CardHeader, Container, List, ListItem, Table, TableCell, TableRow } from '@material-ui/core';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { UserTrades } from '../../models';

const ViewTrade = ({match}) => {
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
                    <Button size="small">Edit</Button>
                    <Button size="small">Complete</Button>
                    <Button size="small">Delete</Button>
                </CardActions>

                </Card>
            </Container>
        </AppLayout>
    )
};

export default ViewTrade;
