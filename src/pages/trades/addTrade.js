import { useState, useEffect } from "react";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataStore } from '@aws-amplify/datastore';
import { UserTrades } from '../../models';
import AppLayout from "../../components/layout/AppLayout";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  const initialFormState = { symbol: "", name: "" };

const AddTrade = () => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState(initialFormState);
    const [scripsNew, updateScrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setLoading(true);
        // await DataStore.save(
        //     new Scrips(formValues)
        // );
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
        const models = await DataStore.query(UserTrades);
        return models;
    }
    useEffect(() => {
        fetchScripts().then(data => {
            console.log("data data", data)
            updateScrips([...data])
        });
    }, []);
    return (
        <AppLayout pageName="Add Trade">
            <Container maxWidth="lg">
            <form className={classes.root} noValidate autoComplete="off">
                {loading ? <div>Loading</div> : (
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Company Name"
                            name="name"
                            value={formValues.name}
                            onChange={(e) => updateField(e.target.name, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="symbol"
                            label="Symbol"
                            name="symbol"
                            value={formValues.symbol}
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
