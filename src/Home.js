import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as FirestoreService from "./services/firestore";
import 'react-toastify/dist/ReactToastify.css';
import {TabPanel} from "react-tabs";


const Home = (props) => {
    const history = useHistory();
    const [groupList, setGroupList] = useState([]);

        useEffect(() => {
            const groupList = [];
            FirestoreService.getGroupList().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    groupList.push(doc.data().name);
                });
                setGroupList(groupList);
            });
        }, []);

        return (
        <>
            <h1>⚽ Kicker</h1>
              <button type="button" class="btn btn-primary" onClick={() => history.push('/newGroup', {param: "newGroup"})}> Create New Group</button>
            <hr/>

            <table class="center" id='students'>
                <tbody>
                    <th>Groups </th>
                    {
                        groupList.map(result =>
                            <tr >
                                <button type="button" class="btn btn-default btn-block" onClick={() => history.push('/'+result, {param: result})}>{result}</button>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </>
    );
}
;

export default Home;