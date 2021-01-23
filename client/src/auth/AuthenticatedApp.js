import React from 'react';
import { userAtom, comicsAtom, analyticsAtom } from '../state/atoms';
import { useRecoilState } from 'recoil';
import { getUserInfo, getComics } from '../api';
import Comics from '../components/Comics';
import Analytics from '../components/Analytics';
import Octopus from '../assets/octopus.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';


const AuthenticatedApp = () => {
    const [userData, setUserData] = useRecoilState(userAtom);
    const [analytics, setAnalytics] = useRecoilState(analyticsAtom);
    let queryFilter = { moshe: true };
    const [comics, setComics] = useRecoilState(comicsAtom);

    const logOut = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        setUserData({ ...userData, isLogged: false });
    }

    const onGetUserInfo = async (e) => {
        e.preventDefault();
        const response = await getUserInfo(userData.email);
        console.log('onGetUserInfo response:', response.user)
        if (response && response.user && response.user.analytics)
            setAnalytics(response.user.analytics);
    }

    const onGetComics = async (e) => {
        e.preventDefault();
        const response = await getComics(queryFilter);
        //console.log('onGetComics response:', response);
        setComics(response.comics.results);
    }

    return (
        <div className="authenticated-app">
            <div className="authenticated-app-header">
                <FontAwesomeIcon icon={faSignOutAlt} className="log-out-button" onClick={(e) => logOut(e)}/>
                {/* <img className="octopus-logo" src={Octopus} /> */}
                <div className="app-title">Authenticated App</div>
                <FontAwesomeIcon icon={faUserCircle} className="user-button" onClick={(e) => console.log(e)}/>
            </div>

            <div className="button-group">
                <button onClick={(e) => onGetUserInfo(e)}>Get My User Info</button>
                <button onClick={(e) => onGetComics(e)}>Get Marval Comics</button>
            </div>

            <h2>id: {userData.id ? userData.id : userData._id}</h2>
            <h2>email: {userData.email}</h2>
            <h2>password: {userData.password}</h2>



            <Analytics />

            {!!comics && <Comics data={comics} />}
        </div>)
}

export default AuthenticatedApp;