import React from 'react';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    fieldContainer: {
        width: '100%',
        marginBottom: 10,
    },
    field: {
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: 10,
        padding: 10
    },
    button: {
        width: '50%'
    },
});
const SignUpForm = ({ onChange, submitForm, goToSignIn }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Container>
                    <Grid container alignContent="center" alignItems="center" justify="center">
                        <Grid>
                            <h2>Sign up</h2>
                        </Grid>

                        <Grid item xs={12} alignContent="center" alignItems="center" justify="center">
                            <TextField className={classes.fieldContainer} name="username" onChange={onChange} placeholder="username" />
                        </Grid>
                        <Grid item xs={12} alignContent="center" alignItems="center" justify="center">
                            <TextField className={classes.fieldContainer} name="password" type="password" onChange={onChange} placeholder="password" />
                        </Grid>
                        <Grid item xs={12} alignContent="center" alignItems="center" justify="center">
                            <TextField className={classes.fieldContainer} name="email" onChange={onChange} placeholder="email" />
                        </Grid>
                        <Grid item xs={12} alignContent="center" alignItems="center" justify="center">
                            <Button  className={classes.button} variant="contained" color="primary" onClick={submitForm}>Sign up</Button>
                            <Button  className={classes.button} variant="contained" onClick={goToSignIn}>Sign in</Button>
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    )
};

export default SignUpForm;
