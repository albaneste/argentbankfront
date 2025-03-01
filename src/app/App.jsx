import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store';
import './App.css';
import Home from "../pages/Home/home";
import Login from '../pages/Login/login';
import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile/profile';
import PrivateRoute from './PrivateRoute';



function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;







