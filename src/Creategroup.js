import 'react-tabs/style/react-tabs.css';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        if(this.state.value) {
            this.isNameTaken(this.state.value).then(canBeUsed => {
                if (canBeUsed) {
                    FirestoreService.createGroup(this.state.value, this.state.pass).then(callback => {
                        this.setState({value: ''});
                        this.setState({pass: ''});
                    }).then(a => toast("⚽ Changes saved", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }));
                } else {
                    toast("⚽ Group already exists", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
        }else {
            toast.configure();
            toast("⚽ Add name", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
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
        return (
            <div className="App">
                                <h1>Create Group</h1>
                                <br/>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.pass} onChange={this.handlePassChange} />
                </label>
                <br/>
                <br/>
                <input type="submit"  class="btn btn-success" value="Submit" />
            </form>
                <br/>
                <button type="button" class="btn btn-primary" onClick={this.redirectToHome}>
                   Go to home
                </button>

                </div>
        );
    }

}
export default withRouter(Creategroup);;