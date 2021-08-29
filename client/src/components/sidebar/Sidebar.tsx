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
import { Class } from 'types';
// import 'react-pro-sidebar/dist/scss/styles.css';

const Sidebar = ({ classes }) => {
  const { colorMode } = useColorMode();
  const [collapsed, setCollapsed] = useState(false);

  const Courses = () => (
    <>
      {classes.map((classItem: Class) => (
        <MenuItem>
          <Link to={`/c/${classItem.id}`}>
            {classItem.classNumber} ({classItem.classTerm})
          </Link>
        </MenuItem>
      ))}
    </>
  );

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
        <Menu>
          <Courses />
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <UserSettings collapsed={collapsed} />
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
