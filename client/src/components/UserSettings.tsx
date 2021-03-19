import React from 'react';
import { Avatar, Menu, Dropdown, Switch } from 'antd';
import useDarkMode from 'use-dark-mode';

const styles = {
  menuItem: {
    padding: '0 16px',
    marginTop: '4px',
    marginBottom: '8px',
  },
};

const UserInfo = () => {
  return (
    <div style={{ textAlign: 'left', padding: '0 20px', display: 'flex' }}>
      <Avatar />
      <div style={{ margin: '0 0 0 10px' }}>
        <span>Lawrence</span>
      </div>
    </div>
  );
};
const SettingsMenu = () => {
  const darkmode = useDarkMode(false);

  return (
    <Menu siderCollapsed={false}>
      <div style={styles.menuItem}>
        <UserInfo />
      </div>
      <Menu.Divider />
      <div style={styles.menuItem}>
        Dark Mode <Switch checked={darkmode.value} onChange={darkmode.toggle} />
      </div>

      <Menu.Item key='1'>
        <span>Settings</span>
      </Menu.Item>

      <Menu.Item key='3'>
        <span>Log Out</span>
      </Menu.Item>
    </Menu>
  );
};
const UserSettings = () => {
  return (
    <>
      <Dropdown
        overlay={<SettingsMenu />}
        trigger={['click']}
        placement='topLeft'
      >
        <div style={{ cursor: 'pointer' }}>
          <UserInfo />
        </div>
      </Dropdown>
    </>
  );
};

export default UserSettings;
