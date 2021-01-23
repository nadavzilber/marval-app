import React, { useState } from 'react';
import { userAtom } from '../state/atoms';
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Marval from '../components/Marval';

const AuthenticatedApp = () => {
    const [userData, setUserData] = useRecoilState(userAtom);
    const [config, setConfig] = useState({ showUserInfo: false })

    const logOut = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        setUserData({ ...userData, isLogged: false });
    }

    return (
        <div className="authenticated-app">
            <div className="authenticated-app-header">
                <FontAwesomeIcon icon={faSignOutAlt} className="log-out-button" onClick={(e) => logOut(e)} />
                <div className="app-title">Authenticated App</div>
                <FontAwesomeIcon icon={faUserCircle} className="user-button" onClick={() => setConfig({ ...config, showUserInfo: !config.showUserInfo })} />
            </div>
            <div className="authenticated-app-body">
                {config && config.showUserInfo &&
                    <div className="user-details">
                        <div>id: {userData.id ? userData.id : userData._id}</div>
                        <div>email: {userData.email}</div>
                        <div>password: {userData.password}</div>
                    </div>}
                <Marval />
            </div>
        </div >)
}

export default AuthenticatedApp;