import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Routes } from "./routes/index";
import Header from "../src/components/header/Header";

ReactDOM.render(
  <Router>
    <ToastProvider>
      <Header />
      <Routes/>
    </ToastProvider>   
  </Router>,
  document.getElementById('root')
);