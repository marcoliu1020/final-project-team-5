import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import styled from 'styled-components';
import LOGO from '../../img/egg.png';
import './MainPageMenu.css';

export interface IMainPageMenuProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

export const StyleLink: typeof Link = styled(Link)`
  font-family: 'American Captain', sans-serif;
  font-size: 24px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #ffc904;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 0.4;
    transition: all 0.2s;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
  &:hover {
    width: 100%;
    color: #ffc904 !important;
    background-color: rgba(0, 0, 0, 0.2);
    &:before,
    &:after {
      width: 100%;
    }
  }
` as any;

export const MainPageMenu: FC<IMainPageMenuProps> = (props) => (
  <Menu
    className="page-menu"
    style={{
      textAlign: 'center',
      alignItems: 'center',
    }}
    selectedKeys={[props.route]}
    mode="horizontal">
    <Menu.Item key="/" disabled>
      <Link
        onClick={() => {
          props.setRoute('/');
        }}
        to="/">
        <img src={LOGO} alt="Logo" className="page-menu--logo" />
      </Link>
    </Menu.Item>
    <Menu.Item key="/mint">
      <StyleLink
        onClick={() => {
          props.setRoute('/mint');
        }}
        to="/mint">
        Mint
      </StyleLink>
    </Menu.Item>
    <Menu.Item key="/staking">
      <StyleLink
        onClick={() => {
          props.setRoute('/staking');
        }}
        to="/staking">
        Staking
      </StyleLink>
    </Menu.Item>
  </Menu>
);
