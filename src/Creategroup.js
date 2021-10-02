// import {useEffect, useState} from 'react';
// import {useHistory, useLocation} from 'react-router-dom';
// import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import * as FirestoreService from './services/firestore';
//
//
// const Creategroup = (props) => {
//         const history = useHistory();
//         const location = useLocation();
//         const [resultList, setResultList] = useState([]);
//         const [open, setOpen] = useState(false);
//
//
//
//         return (
//             <>
//                 <h1>Create Group</h1>
//                 <br/>
//
//                 <label>
//                     Group name :
//                     <input type="text" date="groupName "/>
//                 </label>
//                 <br/>
//                 <label>
//                     Group secret :
//                     <input type="text" date="groupSecret"/>
//                 </label>
//                 <br/>
//                 <button onClick={() => history.goBack()}>Create New Group</button>
//                 <button onClick={() => history.goBack()}>Go Back</button>
//             </>
//         );
//     }
// ;
//
// export default Creategroup;


import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
class Creategroup extends  PureComponent {

    redirectToHome = () => {
        const { history } = this.props;
        if(history) history.push('/');
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            pass: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handlePassChange(event) {
        this.setState({pass: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.isNameTaken(this.state.value).then(canBeUsed => {
            if(canBeUsed) {
                FirestoreService.createGroup(this.state.value, this.state.pass).then(callback => {
                    this.setState({value: ''});
                    this.setState({pass: ''});
                });
            }
        });
    }

   isNameTaken(newName) {
        let groupList = [],
         canBeUsed = FirestoreService.getGroupList()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    groupList.push(doc.data().name);
                });
                return !groupList.some(el => el === newName);
            });
       return canBeUsed;
    }

    render() {
        const { history } = this.props;
        return (
            <div className="App">
                                <h1>Create Group</h1>
                                <br/>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="text" value={this.state.pass} onChange={this.handlePassChange} />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
                <br/>
                <button onClick={this.redirectToHome}>
                   Go to home
                </button>

                </div>
        );
    }

}
export default withRouter(Creategroup);;