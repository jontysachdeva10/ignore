import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import ApiList from './components/ApiList';

const App = () => {
  return (
      <Fragment>
        <Router>
        <Sidebar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/api' element={<ApiList />} />
          </Routes>
        </Router>
      </Fragment>
  )
}

export default App;