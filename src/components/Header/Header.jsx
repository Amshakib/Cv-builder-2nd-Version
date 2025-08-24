import React from 'react';
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = ({ onLogoClick }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Light</Menu.Item>
      <Menu.Item key="2">Dark</Menu.Item>
      <Menu.Item key="3">Vision</Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="app-header">
      <div className="header-logo" onClick={onLogoClick}>
        <Avatar className="logo-avatar" icon={<UserOutlined />} />
        <span className="logo-text">AI Resume Builder</span>
      </div>
      <div className="header-actions">
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className="dropdown-button" icon={<DownOutlined />} />
        </Dropdown>
        <Avatar className="user-avatar" icon={<UserOutlined />} />
      </div>
    </AntHeader>
  );
};

export default Header;
