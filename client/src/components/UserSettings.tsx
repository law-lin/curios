import React from 'react';

import { Avatar, Switch, useColorMode } from '@chakra-ui/react';
import useDarkMode from 'use-dark-mode';

import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider,
  FocusableItem,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { useUser } from 'providers/AuthProvider';
import useLogOut from 'hooks/useLogOut';

const styles = {
  menuItem: {
    marginTop: '4px',
    marginBottom: '8px',
  },
};

const UserInfo = ({ collapsed }: { collapsed?: boolean }) => {
  const { user } = useUser();
  return (
    <div style={{ display: 'flex' }}>
      <Avatar />
      {!collapsed && (
        <div style={{ margin: '0 0 0 10px' }}>
          <span>{user?.name}</span>
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
  const logOutMutation = useLogOut();
  return (
    <>
      <Menu
        menuButton={
          <MenuButton>
            <UserButton />
          </MenuButton>
        }
        direction='top'
        align='start'
        offsetY={12}
      >
        <FocusableItem>
          {({ ref }) => (
            <div style={styles.menuItem}>
              <UserInfo />
            </div>
          )}
        </FocusableItem>

        <MenuDivider />
        <FocusableItem>
          {({ ref }) => (
            <div style={styles.menuItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ marginRight: '10px' }}>Dark Mode</span>
                <Switch
                  checked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                />
              </div>
            </div>
          )}
        </FocusableItem>

        <MenuItem>
          <span>Settings</span>
        </MenuItem>
        <MenuItem onClick={() => logOutMutation.mutate()}>
          <span>Log Out</span>
        </MenuItem>

        {/* <MenuButton
          as={(props) => <UserButton {...props} collapsed={collapsed} />}
        /> */}
      </Menu>
    </>
  );
};

export default UserSettings;
