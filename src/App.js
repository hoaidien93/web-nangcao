import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginComponent from './Components/LoginComponent';
import HomeComponent from './Components/HomeComponent';
import LearnRegisterComponent from './Components/LearnRegisterComponent';
import TeacherRegisterComponent from './Components/TeacherRegisterComponent';
import UserInfo from './Components/UserInfo';
import AdminLoginComponent from './Components/AdminLoginComponent';
import AdminDashboard from './Components/AdminDashboard';
import ListTuTor from './Components/ListTutor';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' component={LoginComponent} />
          <Route path='/register' component={LearnRegisterComponent} />
          <Route path='/teacher-register' component={TeacherRegisterComponent} />
          <Route path='/admin-login' component={AdminLoginComponent} />
          <Route path='/admin-dashboard' component={AdminDashboard} />
          <Route path='/user-info' component = {UserInfo} />
          <Route path="/list-tutor" component = {ListTuTor}/>
          <Route path='/' component={HomeComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
