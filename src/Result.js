import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';


const Result = (props) => {
    const myRef1= React.createRef();
    const myRef2= React.createRef();
        const history = useHistory();
        const location = useLocation();
        const [resultList, setResultList] = useState([]);
        const [groupList, setGroupList] = useState([]);
        const [group1users, setGroup1Users] = useState([]);
        const [group2users, setGroup2Users] = useState([]);
        useEffect(() => {
            const groupList = [];
            FirestoreService.getGroupList().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    groupList.push(doc.data().name);
                });
                setGroupList(groupList);
            });


            const userList = [];
            FirestoreService.getRankingList(location.state.param)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        userList.push(doc.data().name);
                    });
                    setResultList(userList);
                });

        }, []);

        // getUsers(() => {
        //
        // });

        const getGroup1Users = () => {
            const userList = [];
            const group = myRef1.current.options[myRef1.current.selectedIndex].value;
            FirestoreService.getRankingList(group.value)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        userList.push(doc.data().name);
                    });
                    setGroup1Users(userList);
                });
        };

        const getGroup2Users = () => {
            const userList = [];
            const group = myRef2.current.options[myRef2.current.selectedIndex].value;
            FirestoreService.getRankingList(group)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        userList.push(doc.data().name);
                    });
                    setGroup2Users(userList);
                });
        };


        return (
            <>
                <h1>Result Page {location.state.param}</h1>
                <br/>

                <Tabs>
                    <TabList>
                        <Tab>ranking</Tab>
                        <Tab>history</Tab>
                        <Tab>new game result</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>TABELA Z RANKINGIEM</h2>
                        {<ul>
                            {
                                resultList.map(result =>
                                    <li>{result}</li>
                                )
                            }

                        </ul>}
                    </TabPanel>
                    <TabPanel>
                        <h2>TABELA Z WYNIKAMI</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>DODAJTA KTO WYGRAJTA</h2>
                        <div className="header">Add new result</div>
                        <div className="content">
                            <label>
                                Date:
                            </label>
                            <input type="text" date="date"/>

                            <br/>
                            <label>Winners: </label>
                            <select ref={myRef1} onChange={() => getGroup1Users(this)}>
                                {
                                    groupList.map(value=>
                                    <option key={value} value={value}>{value}</option>)
                                }
                            </select>

                            <br/>
                            <label>Winner 1: </label>
                            <select>
                                {group1users}
                            </select>

                            <br/>
                            <label>Winner 2: </label>
                            <select>
                                {group1users}
                            </select>

                            <br/>
                            <br/>
                            <br/>
                            <label>Losers: </label>
                            <select ref={myRef2} onChange={() => getGroup2Users()}>
                                {
                                    groupList.map(value=>
                                        <option key={value} value={value}>{value}</option>)
                                }
                            </select>

                            <br/>
                            <label>Loser 1: </label>
                            <select>
                                {group2users}
                            </select>

                            <br/>
                            <label>Loser 2: </label>
                            <select>
                                {group2users}
                            </select>

                            <br/>
                            <button
                                className="button"
                                //onClick={FirestoreService.addMatch(["PKU", "BSZ"], ["AKO", "PLA"], "ASPEP")}
                            >
                                Submit
                            </button>

                        </div>
                    </TabPanel>
                </Tabs>

                <button onClick={() => history.goBack()}>Go Back</button>
            </>
        )
            ;
    }
;

export default Result;