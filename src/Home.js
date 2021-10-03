import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as FirestoreService from "./services/firestore";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            <h1>Kicker</h1>
              <button type="button" class="btn btn-primary" onClick={() => history.push('/newGroup', {param: "newGroup"})}> Create New Group</button>
            <hr/>


            {
               groupList.map(result =>
                   <p>
                        <button type="button" class="btn btn-primary" onClick={() => history.push('/'+result, {param: result})}>{result}</button>
                   </p>
               )
            }


        </>
    );
}
;

export default Home;