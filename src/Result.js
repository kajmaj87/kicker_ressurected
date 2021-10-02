import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';


const Result = (props) => {
        const history = useHistory();
        const location = useLocation();
        const [resultList, setResultList] = useState([]);
        const [matchtList, setMatchList] = useState([]);
        const [open, setOpen] = useState(false);
        const closeModal = () => setOpen(false);

        useEffect(() => {
            const userList = [];
            const matchlist = [];
            FirestoreService.getRankingList(location.state.param)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        userList.push(doc.data().name);
                    });
                    setResultList(userList);
                });

            FirestoreService.getMatchList(location.state.param)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        matchlist.push(doc.data());
                    });
                    setMatchList(matchlist);
                });
        }, []);


        return (
            <>
                <h1>Result Page {location.state.param}</h1>
                <br/>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="header">Add new result</div>
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
                        <h2>Player list</h2>
                        {<ul>
                            {
                                resultList.map(result =>
                                    <div>{result}</div>
                                )
                            }
                        </ul>}
                    </TabPanel>
                    <TabPanel>
                        <h2>Matches table</h2>
                        {matchtList.map(match => <div>{match.data} {match.losers.join(',')} {match.winners.join(',')} </div>)}

                    </TabPanel>
                </Tabs>


                <button onClick={() => history.goBack()}>Go Back</button>
            </>
        );
    }
;

export default Result;