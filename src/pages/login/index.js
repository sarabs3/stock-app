import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles';
import SignUpForm from '../../components/signupForm';
import SignInForm from '../../components/signinForm';
import ConfirmSugnupForm from '../../components/confirmSignupForm';
import Welcome from '../../components/Welcome';
import { Container, Grid } from '@material-ui/core';


const initialFormState = {
    username: '', password: '', email: '', authCode: '', formType: 'signIn'
};

const useStyles = makeStyles({
    loginForm: {
        background: '#eee',
        width: '100vw',
        height: '100vh',
        display: 'flex',
    },
});
const Login = (props) => {
    const classes = useStyles();
    const [formState, setFormState] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    function onChange (e) {
        e.persist();
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    async function signUp () {
        const { username, email, password } = formState;
        await Auth.signUp({ username, password, attributes: { email } });
        setFormState({ ...formState, formType: "confirmSignup" });
    }
    async function confirmSignUp () {
        const { username, authCode } = formState;
        await Auth.confirmSignUp(username, authCode);
        setFormState({ ...formState, formType: "signIn" });
    }
    async function signIn () {
        setLoading(true);
        const { username, password } = formState;
        await Auth.signIn(username, password);
        props.history.push("/dashboard")
    }
    async function logout () {
        await Auth.signOut();
        setFormState({ ...formState, formType: "signup" });
    }
    
    useEffect(() => {
        async function checkUser () {
            try {
            const user = await Auth.currentAuthenticatedUser();
            console.log("user:", user)
            props.history.push("/dashboard")
            }
            catch (e) {
                console.log('error in getting user info: ', e)
            }
        }
        checkUser();
    }, [props.history])


    function goToSignIn () {
        setFormState({ ...formState, formType: 'signIn' });
    }


    const {formType} = formState;
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className={classes.loginForm}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '98%', marginTop: 100 }} >
                        {formType === 'signup' && <SignUpForm onChange={onChange} submitForm={signUp} goToSignIn={goToSignIn} />}
                        {formType === 'confirmSignup' && <ConfirmSugnupForm onChange={onChange} submitForm={confirmSignUp} />}
                        {formType === 'signIn' && (
                            <SignInForm
                                signupLink={() => setFormState({ ...formState, formType: "signup" })}
                                onChange={onChange}
                                submitForm={signIn}
                            />
                        )}
                        {formType === 'signedIn' && <Welcome signOut={logout} />}
                    </div>

                    </Grid>
                </Grid>
            </Container>
                    
        </div>
    )
};

export default Login;
