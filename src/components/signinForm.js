import { Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    fieldContainer: {
        marginBottom: 14,
        width: '100%'
    },
    field: {
        width: '100%',
        border: 'none',
        borderRadius: 6,
        padding: 8,
        background: '#0180ff',
        boxShadow: 'none',
    },
    formStyle: {
        maxWidth: 350,
    }
});

const SignInForm = ({ onChange, submitForm, signupLink }) => {
    console.log(submitForm, 'submitForm');
    const styles = useStyles();
    return (
        <Card className={styles.formStyle}>
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
                            <Button variant="contained" className={`${styles.field} hjhhj`} color="primary" onClick={submitForm}>Sign in</Button>
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
