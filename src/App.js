import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginComponent from './Components/LoginComponent';
import HomeComponent from './Components/HomeComponent';
import LearnRegisterComponent from './Components/LearnRegisterComponent';
import UserInfo from './Components/UserInfo';
import AdminLoginComponent from './Components/AdminLoginComponent';
import AdminDashboard from './Components/AdminDashboard';
import ListTuTor from './Components/ListTutor';
import DetailTutor from './Components/DetailTutor';
import StudentContract from './Components/StudentContract';
import DetailContract from './Components/DetailContract';
import ManageContract from './Components/ManageContract';
import StatisticRevenue from './Components/StatisticRevenue';
import ForgotPassword from './Components/ForgotPassword';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' component={LoginComponent} />
          <Route path='/register' component={LearnRegisterComponent} />
          <Route path='/admin-login' component={AdminLoginComponent} />
          <Route path='/admin-dashboard' component={AdminDashboard} />
          <Route path='/user-info' component = {UserInfo} />
          <Route path="/list-tutor" component = {ListTuTor}/>
          <Route path="/detail-tutor/:id" component = {DetailTutor}/>
          <Route path="/detail-contract/:id" component = {DetailContract} />
          <Route path="/student-contract" component= {StudentContract} />
          <Route path="/manage-contract" component = {ManageContract} />
          <Route path="/statistic-revenue" component = {StatisticRevenue} />
          <Route path="/forgot-password" component = {ForgotPassword} />
          <Route path='/' component={HomeComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
