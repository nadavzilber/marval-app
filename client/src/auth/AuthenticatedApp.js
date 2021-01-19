import React from 'react';
import { userAtom } from '../state/atoms';
import { useRecoilState } from 'recoil';
import { getUserInfo, getComics } from '../api';

const AuthenticatedApp = () => {
    const [userData, setUserData] = useRecoilState(userAtom);
    let queryFilter;

    const logOut = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        setUserData({ ...userData, isLogged: false });
    }

    const onGetUserInfo = async (e) => {
        e.preventDefault();
        const body = { email: userData.email };
        delete body.isLogged;
        const response = await getUserInfo(body);
        console.log('onGetUserInfo response:', response)
    }

    const onGetComics = async (e) => {
        e.preventDefault();
        const response = await getComics(queryFilter);
        console.log('onGetComics response:', response)
    }

    return (
        <>
            <h4>AuthenticatedApp</h4>
            <button onClick={(e) => logOut(e)}>Log Out</button>

            <h2>id: {userData.id ? userData.id : userData._id}</h2>
            <h2>email: {userData.email}</h2>
            <h2>password: {userData.password}</h2>

            <button onClick={(e) => onGetUserInfo(e)}>Get My User Info</button>
            <button onClick={(e) => onGetComics(e)}>Get Marval Comics</button>
        </>)
}

export default AuthenticatedApp;