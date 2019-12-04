import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginComponent from './Components/LoginComponent';
import HomeComponent from './Components/HomeComponent';
import LearnRegisterComponent from './Components/LearnRegisterComponent';
import AdminLoginComponent from './Components/AdminLoginComponent';
import AdminDashboard from './Components/AdminDashboard';
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
          <Route path='/' component={HomeComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
