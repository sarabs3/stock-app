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
  createdDate: moment().format("yyyy-MM-DD"),   
price: 0 };

const EditTrade = (props) => {
    const classes = styling();
    const [formValues, setFormValues] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        const quantity = parseInt(formValues.quantity);
        const price = parseFloat(formValues.price);
        const target = parseFloat(formValues.target);
        setLoading(true);
        await DataStore.save(UserTrades.copyOf(props.location?.state?.item, item => {
            item.price = price;
            item.quantity = quantity;
            item.createdDate = formValues.createdDate;
            item.totalAmount = parseFloat((price * quantity).toFixed(2));
            item.target = target;
            return item;
        }));
        setLoading(false);
        setFormValues({ ...initialFormState });
        props.history.push(`/trades/${props.location?.state?.item.id}`)
    }

    const updateField = (key, value) => {
        setFormValues((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }
    
    useEffect(() => {
        if (props.location.state) {
            console.log("props.location.state", props.location.state)
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
                                    name="createdDate"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formValues.item?.createdDate}
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
                                <TextField
                                    id="target"
                                    label="Sell Price"
                                    className={classes.input}
                                    name="target"
                                    value={formValues.target}
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
                                            <td>{formValues.createdDate}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.title}>Quantity:</td>
                                            <td>{formValues.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.title}>Price:</td>
                                            <td>{formValues.price}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.title}>Sell Price:</td>
                                            <td>{formValues.target}</td>
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

export default EditTrade;
