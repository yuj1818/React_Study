/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RightMenu(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                navigate('/login');
                localStorage.removeItem('userId')
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="mail">
                    <a href="/login">Sign in</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Sign up</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <a href="/video/upload">Video</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default RightMenu;

