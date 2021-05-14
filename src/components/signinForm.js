import { Button, Container, Grid, TextField } from '@material-ui/core';
import React from 'react';

const SignInForm = ({ onChange, submitForm }) => {
    return (
        <Container>
            <Grid container alignContent="center" alignItems="center" justify="center">
                <Grid item xs={12} alignContent="center" alignItems="center" justify="center">
                    <TextField name="username" onChange={onChange} placeholder="username" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="password" type="password" onChange={onChange} placeholder="password" />
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" onClick={submitForm}>Sign in</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default SignInForm;
