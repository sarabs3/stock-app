import { Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Link } from 'react-router-dom';

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
});

const SignInForm = ({ onChange, submitForm, signupLink }) => {
    const styles = useStyles();
    return (
        <Card>
            <CardContent>
                <Container>
                    <Grid container alignContent="center" alignItems="center" justify="center">
                        <Grid>
                            <h2>Trade Manager</h2>
                        </Grid>
                        <Grid item xs={12} alignContent="center" alignItems="center" justify="center">
                            <TextField className={styles.fieldContainer} name="username" onChange={onChange} placeholder="username" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={styles.fieldContainer}  name="password" type="password" onChange={onChange} placeholder="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" className={styles.field} color="primary" onClick={submitForm}>Sign in</Button>
                        </Grid>
                        <Grid>
                            <p>Create a new account <Link onClick={signupLink} to="/signin">Signup</Link></p>
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    )
};

export default SignInForm;
