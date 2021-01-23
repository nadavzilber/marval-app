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

    const sortListByKey = async (event) => {
        event.preventDefault();
        console.log('TODO: if key wasnt changed then dont send to analytics')
        let sortedList = [...list];
        sortedList = sortedList.sort((a, b) => (a[sortByKey] > b[sortByKey]) ? 1 : -1);
        setList(sortedList);
        const response = await setUserInfo({ query: { email: user.email }, newData: { sortByKey } });
        console.log('sortListByKey :: setUserInfo Response:::', response)
        updateAnalytics({ email: user.email, sortByKey });
    }

    const setAsFavorite = async (issueId) => {
        console.log('setAsFavorite', issueId)
        setUser({ ...user, favorite: issueId })
        const response = await setUserInfo({ query: { email: user.email }, newData: { favorite: issueId } });
        console.log('setAsFavorite :: setUserInfo Response:::', response)
    }

    console.log('Comics.js :: todo: make the favorite button functional');
    return (
        <div>
            {issueKeys &&
                <div className="comics-header">
                    <div className="comics-filter">
                        <button className="sort-by-button" onClick={(e) => sortListByKey(e)}>Sort by {sortByKey}</button>
                        <select
                            className="sort-by-select"
                            value={sortByKey}
                            onChange={(e) => setSortByKey(e.target.value)}>
                            {issueKeys &&
                                issueKeys.map((issueKey, index) =>
                                    <option key={index} value={issueKey}>
                                        {issueKey}
                                    </option>)}
                        </select>
                    </div>
                </div>}
            {list &&
                <table className="comics-table">
                    <thead>
                        <tr className="header-row">
                            {issueKeys.map((header, index) => <th key={index}>{header}</th>)}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((issue, index) => <tr className={`body-row ${issue.id === user.favorite ? 'favorite-issue' : ''}`} key={index}>
                            {issueKeys.map((issueKey, index) => <td key={index}>
                                {issue[issueKey]}
                            </td>)}
                            <td>
                                <div className="favorite-button" onClick={() => setAsFavorite(issue.id)}>{issue.id === user.favorite ? '❤️️' : '💚'}</div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>}
        </div>
    )
}

export default Comics;