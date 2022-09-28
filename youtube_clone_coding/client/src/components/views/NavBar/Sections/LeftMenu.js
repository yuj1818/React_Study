import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="mail2">
                <a href="/subscription">Subscription</a>
            </Menu.Item>
            <SubMenu title={<span>Category</span>}>
                <Menu.Item key="setting:1">
                   <a href="/category/film_and_animation">Film & Animation</a>
                </Menu.Item>
                <Menu.Item key="setting:2">
                    <a href="/category/autos_and_vehicles">Autos & Vehicles</a>
                </Menu.Item>
                <Menu.Item key="setting:3">
                    <a href="/category/music">Music</a>
                </Menu.Item>
                <Menu.Item key="setting:4">
                    <a href="/category/pets_and_animals">Pets & Animals</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default LeftMenu