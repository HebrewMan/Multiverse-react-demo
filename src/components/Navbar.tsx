import React from "react";
import styled from "styled-components";

// 游戏风格的主题颜色
const theme = {
  primary: "#1D1E25;",
  secondary: "white",
};

// 导航栏容器
const NavbarContainer = styled.nav`
  width: 85%;
  margin:0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${theme.primary};
  color: ${theme.secondary};
  text-shadow:  0 0 5px white,0 0 10px #00FFFF,0 0 15px #7FFF00,0 0 20px white;
  font-size: 40px;
`;

// 导航栏标题
const NavbarTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

// 导航栏链接
const NavbarLink = styled.a`
  margin-left: 20px;
  color: ${theme.secondary};
  text-decoration: none;

  &:hover {
    color: ${theme.secondary};
    text-decoration: underline;
  }
`;

// 导航栏组件
const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarTitle>游戏导航</NavbarTitle>
      <div>
        <NavbarLink href="#">首页</NavbarLink>
        <NavbarLink href="#">Mint</NavbarLink>
        <NavbarLink href="#">Arena</NavbarLink>
        <NavbarLink href="#">Vault</NavbarLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
