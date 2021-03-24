import React from 'react';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';

interface ButtonProps {
  isDark: boolean;
  collapsed: boolean;
}
const Button = styled.button<ButtonProps>`
  display: inline-block;
  padding: ${(props) => (props.collapsed ? '0.25rem' : '0.5rem 0')};
  cursor: pointer;
  border-radius: ${(props) => (props.collapsed ? '9999px' : '100px')};
  width: ${(props) => (props.collapsed ? '2rem' : '11rem')};
  color: ${(props) => (props.isDark ? '#FFFFFF' : '#4F4F4F')};
  border: 2px solid ${(props) => (props.isDark ? '#2C2E30' : '#E0E0E0')};
  background: ${(props) => (props.isDark ? '#1E1F21' : '#FAFBFC')};
  &:focus {
    outline: none;
  }
`;

interface Props {
  collapsed: boolean;
}
const CreateButton = ({ collapsed }: Props) => {
  const { value } = useDarkMode(false);

  return (
    <Button isDark={value} collapsed={collapsed}>
      {!collapsed ? 'Create a class or group' : '+'}
    </Button>
  );
};

export default CreateButton;
