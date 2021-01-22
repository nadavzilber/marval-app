import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getAnalytics } from '../api';
import { analyticsAtom, userAtom } from '../state/atoms';

const Analytics = () => {
    //const [list, setList] = useState(data);
    const [analytics, setAnalytics] = useRecoilState(analyticsAtom);
    const [user, setUser] = useRecoilState(userAtom);
    //const [sortByKey, setSortByKey] = useState();
    const analyticsHeaders = ['_id', 'date', 'email', 'sortByKey'];

    useEffect(() => {
        console.log('Analytics useEffects user?', !!user);
        if (!!user && user.email)
            getUserAnalytics();
    }, []);

    const getUserAnalytics = async () => {
        const data = await getAnalytics(user.email);
        console.log('getAnalytics response:', data)
        if (!!data)
            setAnalytics(data);
        else console.log('failed getting the analytics')
    }

    return (
        <div>
            <h4>Analytics</h4>
            {!!analytics &&
                <table className="comics-table">
                    <thead>
                        <tr className="header-row">
                            {analyticsHeaders.map((header, index) => <th key={index}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {analytics.map((analyticsRow, index) => <tr className="body-row" key={index}>
                            {Object.values(analyticsRow).map((rowParam, index) => <td key={index}>
                                {rowParam}
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>}
        </div>
    )
}

export default Analytics;