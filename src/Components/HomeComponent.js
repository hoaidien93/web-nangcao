import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Header from './HeaderComponent';
import MainMenu from './MainMenu';
import ChatComponent from './ChatComponent';
class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.token = localStorage.getItem("token");
        this.state = {
        }
        if (this.token) {
            axios.get("http://localhost:8000/user/info",
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                }).then((res) => {
                    if (res.data.data) {
                        this.setState({
                            role: res.data.data.role.name
                        });
                        localStorage.setItem("role",this.state.role);
                        localStorage.setItem("username",res.data.data.username);
                        localStorage.setItem("id_user",res.data.data.id);
                    }
                    else {
                        this.props.history.push('/login');
                    }
                });
        }
    }

    render() {
        return (
            <div className="homePage">
                {this.state.role === "TUTOR" ?  this.renderHeaderTeacher() : this.renderHeaderStudent()}
            </div>
        );
    }


    renderHeaderStudent() {
        return (
            <div>
                <Header></Header>
                <MainMenu role="STUDENT"></MainMenu>
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                    <div className="content">
                        <p className="topcontent"><span>100 </span>Tutor Online</p>
                        <p className="botcontent">Learn for every situation</p>
                        <p className="botcontent">Join today to get more knowledge</p>
                        <div align="center">
                            <a className="btn btn-primary" href="/register">Register Now</a>
                        </div>
                    </div>
                    <div>
                        <img src="book.png" style={{width: '350px'}}></img>
                    </div>
                </div>
                <ChatComponent></ChatComponent>

            </div>
        );
    }

    renderHeaderTeacher() {
        return (
            <div>
                <Header></Header>
                <MainMenu role="TUTOR"></MainMenu>
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                    <div className="content">
                        <p className="topcontent"><span>100 </span>Turtor Online</p>
                        <p className="botcontent">Learn for every situation</p>
                        <p className="botcontent">Join today to get more knowledge</p>
                        <div align="center">
                            <a className="btn btn-primary" href="/register">Register Now</a>
                        </div>
                    </div>
                    <div>
                        <img src="book.png" style={{width: '350px'}}></img>
                    </div>
                </div>
                <ChatComponent></ChatComponent>
            </div>
        );
    }

}

export default HomeComponent;