import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles';
import SignUpForm from '../../components/signupForm';
import SignInForm from '../../components/signinForm';
import ConfirmSugnupForm from '../../components/confirmSignupForm';
import Welcome from '../../components/Welcome';
import { Container, Grid } from '@material-ui/core';
import ResetForm from '../../components/ResetPasswotd';


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
const PasswordResetError = 'PasswordResetRequiredException';

const Login = (props) => {
    const classes = useStyles();
    const [formState, setFormState] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function onChange (e) {
        e.persist();
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    async function recoverPassword () {
        try {
        const { username, code, password } = formState;
        await Auth.forgotPasswordSubmit(username, code, password);
        } catch (e) {
            setError(e.message);
            console.log("error", e);
        }
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
        try {
            setLoading(true);
            const { username, password } = formState;
            await Auth.signIn(username, password);
            props.history.push("/dashboard")
        } catch (e) {
            if (e.code === PasswordResetError)
            console.log("error", e);
            setLoading(false);
            setFormState({ ...formState, formType: 'resetPassword'});
        }
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
    const isSignUp = !loading && formType === 'signup';
    const isConfirmSignup = !loading && formType === 'confirmSignup';
    const isSign = !loading && formType === 'signIn';
    const isSignedIn = !loading && formType === 'signedIn';
    const isResetPassword = !loading && formType === 'resetPassword';
    return (
        <div className={classes.loginForm}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '98%', marginTop: 100 }} >
                        {loading && <p>Loading...</p>}
                        {isSignUp && <SignUpForm onChange={onChange} submitForm={signUp} goToSignIn={goToSignIn} />}
                        {isConfirmSignup && <ConfirmSugnupForm onChange={onChange} submitForm={confirmSignUp} />}
                        {isSign && (
                            <SignInForm
                                signupLink={() => setFormState({ ...formState, formType: "signup" })}
                                onChange={onChange}
                                submitForm={signIn}
                            />
                        )}
                        {isSignedIn && <Welcome signOut={logout} />}
                        {isResetPassword && <ResetForm error={error} onChange={onChange} submitForm={recoverPassword} />}
                    </div>

                    </Grid>
                </Grid>
            </Container>
                    
        </div>
    )
};

export default Login;
