import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import 'pages/mainpage.css';
import UserSettings from 'components/UserSettings';
import useDarkMode from 'use-dark-mode';
import CreateButton from 'components/CreateButton';
import { Switch, Route, Link } from 'react-router-dom';
import NotificationsView from 'views/NotificationsView';
import MessagesView from 'views/MessagesView';
import SearchView from 'views/SearchView';

const { Sider, Content } = Layout;

function MainPage() {
  const [collapsed, setCollapsed] = useState(false);
  const { value } = useDarkMode(false);

  return (
    <Layout style={{ height: '100vh', background: 'inherit' }}>
      <Sider
        theme={value ? 'dark' : 'light'}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className='sider'>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className='logo'>Curios</div>
            <Menu
              className='nav-list'
              theme={value ? 'dark' : 'light'}
              mode='inline'
              defaultSelectedKeys={['3']}
            >
              <Menu.Item key='1' icon={<BellOutlined />}>
                <Link to={'/notifications'}> Notifications</Link>
              </Menu.Item>
              <Menu.Item key='2' icon={<MessageOutlined />}>
                <Link to={'/messages'}> Messages</Link>
              </Menu.Item>
              <Menu.Item key='3' icon={<SearchOutlined />}>
                <Link to={'/search'}> Search</Link>
              </Menu.Item>
              <Menu.Divider />
            </Menu>
            <div style={{ padding: '24px 20px', flex: 1 }}>
              <CreateButton collapsed={collapsed} />
            </div>
            <div
              style={{
                padding: '24px 20px',
                cursor: 'pointer',
              }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? (
                <>
                  <VerticalRightOutlined /> Collapse
                </>
              ) : (
                <>
                  <VerticalLeftOutlined />
                </>
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '13px 0',
            }}
          >
            <UserSettings />
          </div>
        </div>
      </Sider>
      <Content
        className='site-layout-background'
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Switch>
          <Route exact path={'/notifications'} component={NotificationsView} />
          <Route exact path={'/messages'} component={MessagesView} />
          <Route exact path={'/search'} component={SearchView} />
        </Switch>
      </Content>
    </Layout>
  );
}

export default MainPage;
