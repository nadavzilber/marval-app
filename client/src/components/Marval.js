import React, { useState } from 'react';
import { userAtom, comicsAtom, analyticsAtom } from '../state/atoms';
import { useRecoilState } from 'recoil';
import { getUserInfo, getComics } from '../api';
import Comics from './Comics';
import Analytics from './Analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Marval = () => {
    const [userData, setUserData] = useRecoilState(userAtom);
    const [analytics, setAnalytics] = useRecoilState(analyticsAtom);
    let queryFilter = {}; //TODO: add query filters
    const [comics, setComics] = useRecoilState(comicsAtom);
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
        <div className="marval-wrapper">
            <div className="button-group">
                <button onClick={(e) => onGetUserInfo(e)}>Get My User Info</button>
                <button onClick={(e) => onGetComics(e)}>Get Marval Comics</button>
            </div>
            <Analytics />
            {!!comics && <Comics data={comics} />}
        </div>)
}

export default Marval;