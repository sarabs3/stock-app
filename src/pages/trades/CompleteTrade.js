import { useState, useEffect } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades } from '../../models';
import AppLayout from "../../components/layout/AppLayout";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styling from './EditTrade.css';

const initialFormState = {
  quantity: 0,
  tradeDate: moment().format("yyyy-MM-DD"),   
price: 0 };

const CompleteTrade = (props) => {
    const classes = styling();
    const [formValues, setFormValues] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const submit = async () => {

        // If the quantity is same then update the current trade to be completed
        const quantity = parseInt(formValues.quantity);
        const price = parseFloat(formValues.price);
        if (quantity === props.location?.state?.quantity) {
            setLoading(true);
            await DataStore.save(UserTrades.copyOf(props.location?.state?.item, item => {
                item.tradeDate = formValues.tradeDate;
                item.target = price;
                item.totalAmount = parseFloat((price * quantity).toFixed(2));
                item.expectedProfit = parseFloat((quantity * (price - parseFloat(props.location?.state?.item?.price))).toFixed(2));
                return item;
            }));
            setLoading(false);
            setFormValues({ ...initialFormState });
            return;
        }

        // else create another trade with remaining quanity and update the current one with traded quantity and complete the trade.
        const remainingQuantity = props.location?.state?.quantity - quantity;
        setLoading(true);

        const expectedProfit = parseFloat((remainingQuantity * (parseFloat(props.location?.state?.item?.target) - parseFloat(props.location?.state?.item?.price))).toFixed(2));
        const expectedProfit2 = parseFloat((quantity * (price - parseFloat(props.location?.state?.item?.price))).toFixed(2));;
        if (!expectedProfit || !expectedProfit2) {
            alert('error');
            return;
        }
        const payload = {
            ...props.location?.state?.item,
            quantity: remainingQuantity,
            totalAmount: parseFloat((price * remainingQuantity).toFixed(2)),
            expectedProfit: expectedProfit,

        };
        await DataStore.save(
            new UserTrades(payload)
        );
        
        await DataStore.save(UserTrades.copyOf(props.location?.state?.item, item => {
            item.quantity = quantity;
            item.target = price;
            item.totalAmount = parseFloat((price * quantity).toFixed(2));
            item.tradeDate = formValues.tradeDate;
            item.expectedProfit = expectedProfit2;
            return item;
        }));
        setLoading(false);
    }

    const updateField = (key, value) => {
        setFormValues((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }
    
    useEffect(() => {
        if (props.location.state) {
            setFormValues((prevState) => ({ ...prevState, ...props.location.state }))
        }
    }, [props.location?.state]);

    
    return (
        <AppLayout pageName="Edit Trade">
            <Container maxWidth="lg">
            <form className={classes.root} noValidate autoComplete="off">
                {loading ? <div>Loading</div> : (
                <Grid container style={{width: '100%'}}>
                    <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent className={classes.cardContent}>
                            <Grid container style={{width: '100%'}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                Edit Trade
                                </Typography>
                            </Grid>  
                            <Grid item xs={12}>
                                <TextField
                                    label="Traded Date"
                                    type="date"
                                    name="tradeDate"
                                    defaultValue={moment().format("yyyy-MM-DD")}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => updateField(e.target.name, e.target.value)}
                                />
                            </Grid>                  
                            <Grid item xs={12}>
                                <TextField
                                    id="quantity"
                                    style={{width: '100%'}}
                                    label="Quantity"
                                    name="quantity"
                                    value={formValues.quantity}
                                    onChange={(e) => updateField(e.target.name, e.target.value)}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    id="price"
                                    label="Price"
                                    className={classes.input}
                                    name="price"
                                    value={formValues.price}
                                    onChange={(e) => updateField(e.target.name, e.target.value)}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                            <div className={classes.dataToBeEntered}>
                                    <table>
                                        <tr>
                                            <td colSpan={2} className={classes.previewTitle}>Preview</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.title}>Date:</td>
                                            <td>{formValues.tradeDate}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.title}>Quantity:</td>
                                            <td>{formValues.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.title}>Price:</td>
                                            <td>{formValues.price}</td>
                                        </tr>
                                    </table>
                                </div>
                            <Button className={classes.button} onClick={submit} variant="contained">Submit</Button>
                        </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                )}
            </form>
            </Container>
        </AppLayout>
    )
}

export default CompleteTrade;
