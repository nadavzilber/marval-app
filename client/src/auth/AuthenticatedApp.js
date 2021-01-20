import React from 'react';
import { userAtom, comicsAtom } from '../state/atoms';
import { useRecoilState } from 'recoil';
import { getUserInfo, getComics } from '../api';
import Comics from '../components/Comics';

const AuthenticatedApp = () => {
    const [userData, setUserData] = useRecoilState(userAtom);
    let queryFilter = {moshe: true};
    const [comics, setComics] = useRecoilState(comicsAtom);

    const logOut = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        setUserData({ ...userData, isLogged: false });
    }

    const onGetUserInfo = async (e) => {
        e.preventDefault();
        const response = await getUserInfo(userData.email);
        console.log('onGetUserInfo response:', response)
    }

    const onGetComics = async (e) => {
        e.preventDefault();
        const response = await getComics(queryFilter);
        console.log('onGetComics response:', response);
        setComics(response.comics.results);
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
            
            {!!comics && <Comics data={comics} />}
        </>)
}

export default AuthenticatedApp;