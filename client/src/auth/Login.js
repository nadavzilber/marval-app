import React, { useState, useEffect } from 'react';
//import { Redirect } from 'react-router-dom';
import { useRecoilState } from "recoil";
//import styled from 'styled-components';
import { userAtom, alertAtom } from "../state/atoms";
// import {handleLoginSelector} from "../state/selectors";
import { test, authenticate } from '../api';
import './login.css';


const Login = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useRecoilState(userAtom);
    const [alert, setAlert] = useRecoilState(alertAtom);

    useEffect(() => {
        checkIfAuthenticated();
    }, [])

    const checkIfAuthenticated = async () => {
        //console.log('checkIfAuth', userData)
        if (!userData || !!userData && !userData.isLogged) {
            //console.log('checking')
            let credentials = window.sessionStorage.getItem('credentials');
            credentials = JSON.parse(credentials);
            //console.log('credentials:', credentials)
            if (credentials) {
                const { username, email, password } = credentials;
                if (email && password) {
                    const body = { username: username, email: email, password: password };
                    const res = await authenticate(mode, body);
                    //console.log('checkIfAuth login resp:', res)
                    if (res.status && res.user) {
                        const editableUserData = { ...res.user };
                        delete editableUserData.id;
                        setUserData({ ...res.user, editableUserData, isLogged: true });
                    } //else console.log("user doesn't exist");
                }
            }
        } 
        // else {
        //     console.log('checkIfAlreadyAuth user us already logged', userData)
        // }
    }

    const handleLogin = async () => {
        //console.log('handleLogin')
        if (email.trim().length && password.trim().length) {
            const body = { email, password };
            const res = await authenticate(mode, body);
            console.log('api:::', mode, 'response:>', res)
            if (res && res.user) {
                const editableUserData = { ...res.user };
                delete editableUserData.id;
                setUserData({ ...res.user, editableUserData, isLogged: true });
                //window.location.href = '/';
                window.sessionStorage.setItem('credentials', JSON.stringify(body))
            } else {
                setAlert({ show: true, message: "Please try again with a different email and/or password", title: 'Login Failed' })
            }
        }
    }

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    return <div className="login-wrapper">
        <form className="form-login">
            <h1 className="form-title">{capitalize(mode)}</h1>
            <div className="form-group form-group-input">
                <input className="form-input" type="text" id="email" name="email" autoComplete="off" required placeholder="" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-group form-group-input">
                <input className="form-input" type="password" id="password" name="password" autoComplete="off" required placeholder="" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
            </div>
            <button type="button" className="form-login-btn" onClick={test}>Test</button>
            <button type="button" className="form-login-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>Switch to {mode === 'login' ? 'register' : 'login'}</button>
            <button type="button" className="form-login-btn" onClick={handleLogin}>{mode === 'login' ? 'Sign In' : 'Sign Up'}</button>
        </form>
    </div>
};

export default Login;