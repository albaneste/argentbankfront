import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store';
import './App.css';
import Home from "../pages/Home/home";
import Signin from '../pages/Signin/signin';
import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile/profile';
import PrivateRoute from './PrivateRoute';



function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/profil" element={<PrivateRoute><Profile /></PrivateRoute>} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;







