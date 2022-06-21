import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';
import NewResult from './NewResult';
import axios from 'axios';
const { URL } = process.env


const Result = (props) => {
        const history = useHistory();
        const location = useLocation();
        const [resultList, setResultList] = useState([]);
        const [matchtList, setMatchList] = useState([]);

        useEffect(() => {
            const matchlist = [];
            readKickerRanking();
            FirestoreService.getMatchList(location.state.param)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        matchlist.push(doc.data());
                    });
                    matchlist.sort((a, b) => (new Date(a.data * 1000).getTime() - new Date(b.data * 1000).getTime()))
                    setMatchList(matchlist.reverse());
                });
        }, []);

    const renderTableData = () => {
        return matchtList.map((match, index) => {
            let date = new Date(match.data.seconds * 1000);
            let createDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-'+ date.getDate()
            return (
                <tr key={index}>
                    <td>{createDate}</td>
                    <td>{match.winners.join(',')}</td>
                    <td>{match.losers.join(',')}</td>
                </tr>
            )
        })
    }

    const readKickerRanking = async function () {
        const query = location.state.param ? `?group=${location.state.param}` : '',
            ranking_url = `${window.location.origin}/api/ranking${query}`,
            matches_url = `${window.location.origin}/api/matches${query}`,
            ranking = await axios.get(ranking_url),
            matches = await axios.get(matches_url);
            
        ranking.data.map(r => {
          r.wins = matches.data.reduce((acc, match) => (match.winners.indexOf(r.user) >= 0 ? 1 : 0) + acc, 0);
          r.loses = matches.data.reduce((acc, match) => (match.losers.indexOf(r.user) >= 0 ? 1 : 0) + acc, 0);
        });
        
        setResultList(ranking.data);
    }

    const renderRankingTableData = () => {
        return resultList.map((result, index) => {
            return (
                <tr key={index}>
                    <td>{result.rank}</td>
                    <td>{result.user}</td>
                    <td>{result.wins}</td>
                    <td>{result.loses}</td>
                </tr>
            )
        })
    }

        return (
            <>
                <h1>🥅 Result Page - {location.state.param}</h1>
                <br/>

                <Tabs>
                    <TabList>
                        <Tab>Ranking List</Tab>
                        <Tab>Match History </Tab>
                        <Tab>New Game Result</Tab>
                    </TabList>
                    <TabPanel>
                        <h2>📈 Ranking</h2>
                        <p>games played: {matchtList.length} </p>
                        <button type="button" class="btn btn-primary" onClick={() => history.goBack()}>Go Back</button>
                        <table class="center" id='students'>
                            <tbody>
                                <th>Rank</th>
                                <th>Player </th>
                                <th>Wins</th>
                                <th>Loses</th>
                                {renderRankingTableData()}
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel>
                        <h2>🕒 Matches table</h2>
                        <button type="button" class="btn btn-primary" onClick={() => history.goBack()}>Go Back</button>
                        <table class="center" id='students'>
                            <tbody>
                                <th>Date </th>
                                <th>Winners </th>
                                <th>Losers </th>
                                {renderTableData()}
                            </tbody>
                        </table>

                    </TabPanel>
                    <TabPanel>
                        <NewResult group={location.state.param}/>
                    </TabPanel>
                </Tabs>
            </>
        );
    }
;

export default Result;
