import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';


const Result = (props) => {
    const history = useHistory();
    const location = useLocation();
    const [resultList, setResultList] = useState([]);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(() => {
        console.log(location.state.param)
        const userList = [];

        FirestoreService.getRankingList(location.state.param).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userList.push(doc.data().user);
            });
            setResultList(userList);
        });
    });


    return (
        <>
            <h1>Result Page {location.state.param}</h1>
            <br/>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="header"> Add new result</div>
                <div className="content">
                    <label>
                        Date:
                        <input type="text" date="date"/>
                    </label>
                    <label>
                        Group Win:
                        <input type="text" groupWin="name"/>
                    </label>
                    <label>
                        Loser group:
                        <input type="text" loserGroup="name"/>
                    </label>
                    <button
                        className="button"
                        onClick={closeModal}>
                        Submit
                    </button>
                </div>
            </Popup>

            <Tabs>
                <TabList>
                    <Tab>ranking</Tab>
                    <Tab>history</Tab>
                    <button type="button" className="button" onClick={() => setOpen(o => !o)}>
                        add result
                    </button>
                </TabList>

                <TabPanel>
                    <h2>TABELA Z RANKINGIEM</h2>
                </TabPanel>
                <TabPanel>
                    <h2>TABELA Z WYNIKAMIdffdfd</h2>
                </TabPanel>
            </Tabs>

            {<ul>
                {
                    resultList.map(result =>
                        <li>{result}</li>
                    )
                }

            </ul>}
            <button onClick={() => history.goBack()}>Go Back</button>
        </>
    );
};

export default Result;