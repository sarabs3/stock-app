import { useState, useEffect } from "react";
import { Button, Container, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify'
import Grid from '@material-ui/core/Grid';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades, Scrips } from '../../models';
import AppLayout from "../../components/layout/AppLayout";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  const initialFormState = {
  quantity: 0,
price: 0 };

const AddTrade = () => {
    const classes = useStyles();
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
            date: new Date(),
            userId: user.attributes?.sub,
            price,
            quantity,
            Scrips: selectedScrip,
            totalAmount: parseFloat((price * quantity).toFixed(2)),
            target,
            expectedProfit: parseFloat((quantity * (target - price)).toFixed(2)),
        };
        console.log('user:', user.attributes?.sub, payload);
        await DataStore.save(
            new UserTrades(payload)
        );
        setLoading(false);
        setFormValues({ ...initialFormState });
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
            console.log("data data", data)
            updateScrips([...data])
        });
    }, []);
    const handleChange = (e) => {
        setSelectedScrip(e.target.value)
    }
    return (
        <AppLayout pageName="Add Trade">
            <Container maxWidth="lg">
            <form className={classes.root} noValidate autoComplete="off">
                {loading ? <div>Loading</div> : (
                <Grid container>
                    <Grid item xs={12}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="scrip"
                        onChange={handleChange}
                        >
                            {scripsNew.map(scrip => (
                                <MenuItem key={scrip.id} value={scrip}>{scrip.name}</MenuItem>
                            ))}
                    </Select>
                    </Grid>                    
                    <Grid item xs={12}>
                        <TextField
                            id="quantity"
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
                            name="price"
                            value={formValues.price}
                            onChange={(e) => updateField(e.target.name, e.target.value)}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button onClick={submit} variant="contained">Submit</Button>
                    </Grid>
                </Grid>
                )}
            </form>
            </Container>
        </AppLayout>
    )
}

export default AddTrade;
