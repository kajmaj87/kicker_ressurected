import 'react-tabs/style/react-tabs.css';
import 'reactjs-popup/dist/index.css';
import * as FirestoreService from './services/firestore';
import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewResult extends PureComponent {

    redirectToHome = () => {
        const {history} = this.props;
        if (history) history.push('/');
    }

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            userList: [],
            winners: '',
            losers: '',
            checkPass: '',
            valid: false
        };
        this.handleWinnersChange = this.handleWinnersChange.bind(this);
        this.handleLosersChange = this.handleLosersChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.revertTeams = this.revertTeams.bind(this);
    }

    revertTeams() {
        this.setState({winners: this.state.losers});
        this.setState({losers: this.state.winners});
    }

    handleWinnersChange(event) {
        this.setState({winners: event.target.value});
    }

    handleLosersChange(event) {
        this.setState({losers: event.target.value});
    }

    checkPass(event) {
        this.setState({checkPass: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        if(this.state.losers && this.state.winners){
        FirestoreService.getGroupPass(this.props.group)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password === this.state.checkPass) {
                        this.setState({valid: true});
                    } else {
                        toast.configure();
                        toast("Wrong password", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                });
                if (this.state.valid && this.state.losers && this.state.winners) {
                    FirestoreService.addMatch(this.state.losers, this.state.winners, this.props.group).then(a => {
                        toast.configure();
                        toast("Changes saved", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    });
                }
            });
        }
        else{
            toast.configure();
            toast("Add all mandatory fields ", {
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

    loadGroupList(newName) {
        const groupList = [];
        FirestoreService.getGroupList().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                groupList.push(doc.data().name);
            });
            this.setState({groupList: groupList})
        });
    }

    getGroupUsers = () => {
        const userList = [];
        //  const group = myRef1.current.options[myRef1.current.selectedIndex].value;
        FirestoreService.getRankingList(this.props.group)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userList.push(doc.data().name);
                });
                this.setState({userList: userList});
            });
    };


    render() {
        return (
            <div>
                <h2>Add New result</h2>
                <button type="button" class="btn btn-primary" onClick={this.revertTeams}>
                    Revert
                </button>
                <form onSubmit={this.handleSubmit}>
                    <br/>
                    <label>
                        Winners:
                        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.winners} onChange={this.handleWinnersChange}/>
                    </label>
                    <br/>
                    <label>
                        Losers:
                        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.losers} onChange={this.handleLosersChange}/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="password"  class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.pass} onChange={this.checkPass}/>
                    </label>
                    <br/>
                    <input type="submit"  class="btn btn-success" value="Submit"/>
                </form>
                <br/>
            </div>
        );
    }

}

export default withRouter(NewResult);
;