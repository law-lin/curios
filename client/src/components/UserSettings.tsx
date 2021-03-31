import React from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Avatar,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import useDarkMode from 'use-dark-mode';

const styles = {
  menuItem: {
    padding: '0 16px',
    marginTop: '4px',
    marginBottom: '8px',
  },
};

const UserInfo = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Avatar />
      {!collapsed && (
        <div style={{ margin: '0 0 0 10px' }}>
          <span>Lawrence</span>
        </div>
      )}
    </div>
  );
};

const UserButton = React.forwardRef((props: any, ref: any) => (
  <div
    {...props}
    style={{
      textAlign: 'left',
      padding: '0 20px',
      display: 'flex',
      cursor: 'pointer',
    }}
  >
    <UserInfo collapsed={props.collapsed} />
  </div>
));

const UserSettings = ({ collapsed }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Menu strategy='fixed'>
        <MenuList right={0} width={150}>
          <div style={styles.menuItem}>
            <UserInfo />
          </div>
          <MenuDivider />
          <div style={styles.menuItem}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Dark Mode</span>
              <Switch
                checked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </div>
          </div>

          <MenuItem>
            <span>Settings</span>
          </MenuItem>
          <MenuItem>
            <span>Log Out</span>
          </MenuItem>
        </MenuList>
        <MenuButton
          as={(props) => <UserButton {...props} collapsed={collapsed} />}
        />
      </Menu>
    </>
  );
};

export default UserSettings;
