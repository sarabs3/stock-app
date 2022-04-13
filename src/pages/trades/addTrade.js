import { useState, useEffect } from "react";
import { Button, Container, MenuItem, Select, TextField } from "@material-ui/core";
import { Auth } from 'aws-amplify'
import Grid from '@material-ui/core/Grid';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades, Scrips } from '../../models';
import AppLayout from "../../components/layout/AppLayout";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import styles from './addTrade.css';


  const initialFormState = {
  quantity: 0,
  createdDate: moment().format("yyyy-MM-DD"),
price: 0 };

const AddTrade = () => {
    const history = useHistory();
    const classes = styles();
    const [formValues, setFormValues] = useState(initialFormState);
    const [selectedScrip, setSelectedScrip] = useState({});
    const [scripsNew, updateScrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setLoading(true);
        const user = await Auth.currentAuthenticatedUser();
        const price = parseFloat(formValues.price);
        const quantity = parseInt(formValues.quantity);
        const target = parseFloat((price+(price/33)).toFixed(2));
        const payload = {
            createdDate: formValues.createdDate,
            userId: user.attributes?.sub,
            price,
            quantity,
            Scrips: selectedScrip,
            totalAmount: parseFloat((price * quantity).toFixed(2)),
            target,
            expectedProfit: parseFloat((quantity * (target - price)).toFixed(2)),
        };
        const trade = await DataStore.save(
            new UserTrades(payload)
        );
        setLoading(false);
        setFormValues({ ...initialFormState });
        history.push(`/trades/${trade.id}`);
    }
    const updateField = (key, value) => {
        setFormValues((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }
    
    const fetchScripts = async () => {
        const models = await DataStore.query(Scrips);
        return models;
    }
    useEffect(() => {
        fetchScripts().then(data => {
            updateScrips([...data])
        });
    }, []);
    const handleChange = (e) => {
        setSelectedScrip(e.target.value)
    }
    console.log('a');

    
    return (
        <AppLayout pageName="Add Trade">
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
                                Add Trade
                                </Typography>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="scrip"
                                    style={{width: '100%'}}
                                    onChange={handleChange}
                                    >
                                        {scripsNew.map(scrip => (
                                            <MenuItem key={scrip.id} value={scrip}>{scrip.name}</MenuItem>
                                        ))}
                                </Select>
                            </Grid>  
                            <Grid item xs={12}>
                                <TextField
                                    label="Created Date"
                                    type="date"
                                    name="createdDate"
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
                                            <td className={classes.title}>Stock:</td>
                                            <td>{selectedScrip?.name}</td>
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

export default AddTrade;
