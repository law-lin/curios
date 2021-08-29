import React from 'react';

import {
  MenuList,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  Button,
  Avatar,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import useDarkMode from 'use-dark-mode';

import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider,
  FocusableItem,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { logout } from 'lib/supabase/store';

const styles = {
  menuItem: {
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
        <MenuItem onClick={logout}>
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
