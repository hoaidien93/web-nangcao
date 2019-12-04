import React from 'react';
import { Redirect } from 'react-router-dom';
class AdminDashboard extends React.Component {
    render() {
        return (
            <div className="homePage">
                {this.renderRedirect()}
                {this.renderTemplate()}
            </div>
        );
    }
    renderRedirect() {
        let username = localStorage.getItem("username");
        let role = localStorage.getItem("role");
        if (!username || role !== "admin") {
            return (<Redirect to='/ladmin-login' />);
        }
        return;
    }

    renderTemplate(){
        return(
        <div className="container-fluid m-0 p-0">
            <ol class="breadcrumb pl-5">
            <li class="breadcrumb-item">
                <a href="#">DASHBOARD</a>
            </li>
            </ol>
        </div>
        );
    }

}

export default AdminDashboard;