import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Input2 } from '../sharedComponents/Input';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';

const signinStyles = {
    googleButton:{
        backgroundColor: 'rgb(66,133,244)',
        margin: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }
}

//Styled Link for Navbar
const NavA = styled (Link) ({
    display: 'block',
    color: 'black',
    fontFamily: 'sans-serif',
    marginBottom: '20px'
})

//Functional components to be used inside of SignIn Component
const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6} variant='filled' />
}

interface ButtonProps {
    open?: boolean,
    onClick?: ()=> void //onClick is expected to be a function that may not return something but will do something

}

//Functional component to conditionally render Google SignIn Button
const GoogleButton = (props:ButtonProps) => {
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

    const signIn = async () =>{
        await signInWithGoogle()
        // Storing authenticated user in a local variable
        localStorage.setItem('myAuth', 'true')
        //navigate to dashboard after successful signin
        navigate('/dashboard')
    }

    const signUsOut = async () => {
        await signOut(auth)
        //setting local variable to false for signed out usser
        localStorage.setItem('myAuth', 'false')
        navigate('/signin')
    }

    if (loading) {
        return <CircularProgress/>
    }
    if (localStorage.getItem('myAuth') == 'true') {
        return(
            <Button variant="contained" color="secondary" onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
        <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
        )
    }
    // if (auth.currentUser){
    //     return (
    //         <Button variant='contained' color='secondary' onClick={signUsOut}>Sign Out</Button>
    //     )
    // } else {
    //     return (
    //         <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
    //     )
    
    // }
}

interface UserProps {
    email?: any,
    password?: any,
}


export const SignIn = (props:UserProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth()
    const handleSnackOpen = () => {
        setOpen(true)
    }
    const handleSnackClose = () => {
        setOpen(false)
        navigate('/dashboard')
    }

    //onSubmit to grab user info from form
    const onSubmit = async (data:any, event:any) => {
        console.log(data.email, data.password)
        //adding option to sign in with form
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Sign In
                //checking for current user
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user
                navigate('/dashboard')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            })

    }
    return (
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Email here ...'/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Password here...'/>
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
            <NavA to='/signup'>Don't have an account? Sign Up Here</NavA>
            <GoogleButton open={open} onClick={handleSnackClose}/>
            <Snackbar message ='Success' open={open} autoHideDuration={3000}>
                <Alert severity="success">
                    <AlertTitle>Successful Sign In --- redirecting in 3 seconds...</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
)}

export const SignUp = (props: UserProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }
    const handleSnackClose = () => {
        setOpen(false)
        navigate('/signin')
    }
    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password)
        console.log(auth)

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential)=> {
            //Signed In
            const user = userCredential.user 
            console.log(user)
            navigate('/signin')
        })
        .catch((error)=> {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }
    return (
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Email here ...'/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Password here...'/>
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
            <Snackbar message ='Success' open={open} onClose={handleSnackClose} autoHideDuration={3000}>
                <Alert severity="success">
                    <AlertTitle>Successful Sign Up --- redirecting in 3 seconds...</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
)
}
