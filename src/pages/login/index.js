import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify'
import SignUpForm from '../../components/signupForm';
import SignInForm from '../../components/signinForm';
import ConfirmSugnupForm from '../../components/confirmSignupForm';
import Welcome from '../../components/Welcome';


const initialFormState = {
    username: '', password: '', email: '', authCode: '', formType: 'signIn'
};

const Login = (props) => {
    const [formState, setFormState] = useState(initialFormState);

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
        const { username, password } = formState;
        await Auth.signIn(username, password);
        props.history.push("/dashboard")
    }
    async function logout () {
        await Auth.signOut();
        setFormState({ ...formState, formType: "signup" });
    }
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
    useEffect(() => {
        checkUser();
    }, [])


    function goToSignIn () {
        setFormState({ ...formState, formType: 'signIn' });
    }


    const {formType} = formState;

    return (
        <div>
            <h2>Login Here!</h2>
            <div style={{ display: 'flex', justifyContent: 'center', width: '98%', marginTop: 100 }} >
                {formType === 'signup' && <SignUpForm onChange={onChange} submitForm={signUp} goToSignIn={goToSignIn} />}
                {formType === 'confirmSignup' && <ConfirmSugnupForm onChange={onChange} submitForm={confirmSignUp} />}
                {formType === 'signIn' && <SignInForm onChange={onChange} submitForm={signIn} />}
                {formType === 'signedIn' && <Welcome signOut={logout} />}
            </div>
        </div>
    )
};

export default Login;
