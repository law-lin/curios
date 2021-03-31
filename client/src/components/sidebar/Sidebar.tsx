import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
} from 'react-pro-sidebar';
import { useColorMode } from '@chakra-ui/react';
import {
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import 'components/sidebar/sidebar.css';
import CreateButton from 'components/CreateButton';
import UserSettings from 'components/UserSettings';
// import 'react-pro-sidebar/dist/scss/styles.css';

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const [collapsed, setCollapsed] = useState(false);
  console.log(colorMode);
  return (
    <ProSidebar className={colorMode} collapsed={collapsed}>
      <SidebarContent>
        <Menu>
          <MenuItem icon={<BellOutlined />}>
            <Link to={'/notifications'}> Notifications</Link>
          </MenuItem>
          <MenuItem key='2' icon={<MessageOutlined />}>
            <Link to={'/messages'}> Messages</Link>
          </MenuItem>
          <MenuItem key='3' icon={<SearchOutlined />}>
            <Link to={'/search'}> Search</Link>
          </MenuItem>
        </Menu>
        <Menu>
          <MenuItem>
            <CreateButton collapsed={collapsed} />
          </MenuItem>
        </Menu>
        <div
          style={{
            padding: '24px 20px',
            cursor: 'pointer',
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {!collapsed ? 'Collapse' : '>'}
        </div>
      </SidebarContent>

      <SidebarFooter>
        <UserSettings collapsed={collapsed} />
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
