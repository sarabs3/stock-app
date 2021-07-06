import { useState, useEffect } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades } from '../../models';
import AppLayout from "../../components/layout/AppLayout";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
root: {
        minWidth: 275,
        width: '100%',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    },
    cardContent: {
        width: '100%'
    },
    input: {
        width: '100%'
    },
    button: {
        marginTop: '2rem'
    },
  }));
  const initialFormState = {
  quantity: 0,
price: 0 };

const EditTrade = (props) => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const submit = async () => {

        // If the quantity is same then update the current trade to be completed
        const quantity = parseInt(formValues.quantity);
        if (quantity === props.location?.state?.quantity) {
            setLoading(true);
            await DataStore.save(UserTrades.copyOf(props.location?.state?.item, item => {
                item.tradeDate = formValues.tradeDate;
                return item;
            }));
            setLoading(false);
            setFormValues({ ...initialFormState });
            return;
        }

        // else create another trade with remaining quanity and update the current one with traded quantity and complete the trade.
        const remainingQuantity = props.location?.state?.quantity - quantity;
        setLoading(true);


        const payload = {
            ...props.location?.state?.item,
            quantity: remainingQuantity,
        };
        await DataStore.save(
            new UserTrades(payload)
        );
        
        await DataStore.save(UserTrades.copyOf(props.location?.state?.item, item => {
            item.quantity = quantity;
            item.tradeDate = formValues.tradeDate;
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
