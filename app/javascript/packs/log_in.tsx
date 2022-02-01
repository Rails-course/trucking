import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from "../components/LoginForm";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <LoginForm/>,
        document.body.appendChild(document.createElement('div')),
    );
});
