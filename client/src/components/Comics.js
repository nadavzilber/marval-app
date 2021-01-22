import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { setUserInfo, updateAnalytics } from '../api';
import { userAtom } from '../state/atoms';
import './comics.css';

const Comics = ({ data }) => {
    const [list, setList] = useState(data);
    const [user, setUser] = useRecoilState(userAtom);
    const [sortByKey, setSortByKey] = useState();

    const issueKeys = ['id', 'modified', 'pageCount', 'title'];

    useEffect(() => {
        user && user.sortByKey ? setSortByKey(user.sortByKey) : setSortByKey('none');
    }, [])

    const sortListByKey = (event) => {
        event.preventDefault();
        let sortedList = [...list];
        sortedList = sortedList.sort((a, b) => (a[sortByKey] > b[sortByKey]) ? 1 : -1);
        setList(sortedList);
        setUserInfo({ query: { email: user.email }, newData: { sortByKey } });
        updateAnalytics({ email: user.email, sortByKey });
    }

    return (
        <div>
            <h4>Comics</h4>
            {issueKeys &&
                <select
                    value={sortByKey}
                    onChange={(e) => setSortByKey(e.target.value)}>
                    {issueKeys &&
                        issueKeys.map((issueKey, index) =>
                            <option key={index} value={issueKey}>
                                {issueKey}
                            </option>)}
                </select>}
            <button className="sort-by" onClick={(e) => sortListByKey(e)}>Sort by {sortByKey}</button>
            {list &&
                <table className="comics-table">
                    <thead>
                        <tr className="header-row">
                            {issueKeys.map((header, index) => <th key={index}>{header}</th>)}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((issue, index) => <tr className="body-row" key={index}>
                            {issueKeys.map((issueKey, index) => <td key={index}>
                                {issue[issueKey]}
                            </td>)}
                            <td>
                                <div>Favorite</div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>}
        </div>
    )
}

export default Comics;