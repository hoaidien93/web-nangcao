import React from 'react';
import { Redirect } from 'react-router-dom';

class HomeComponent extends React.Component {
    render() {
        return (
            <div class="homePage">
                {this.renderRedirect()}
                HomeComponent
            </div>
        );
    }
    renderRedirect(){
        let username = localStorage.getItem("username");
        if(!username){
            return (<Redirect to='/login' />);
        }
        return ;
    }

}

export default HomeComponent;