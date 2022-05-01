import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/constants/routes';
import { useNavigate, useLocation } from 'react-router';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;

  .logo {
    cursor: pointer;
    font-size: 2.5rem;
  }
  .menu-list {
    display: flex;
    margin-left: auto;
  }

  .menu-item {
    &.active {
      font-weight: 500;
      color: var(--white);
    }
    font-family: 'Material Icons';
    color: var(--black-80);
    padding: 0 20px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;

    &:hover { color: var(--primary); }
  }
`;

export const TheHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuList = [
    { title: t('menu.projects'), href: ROUTES.PROJECTS, },
    { title: t('menu.issues'), href: ROUTES.ISSUES, },
    { title: t('menu.statistics'), href: ROUTES.STATISTICS, },
  ];

  const handleMenuItemClick = (href: string) => {
    if (!href) return;
    console.log(href);
    navigate(href);
  };

  const isActive = (href: string) => {
    console.log(href);
    return location.pathname.startsWith(href) ? 'active' : '';
  };
  
  return (
    <HeaderWrapper>
        <div className="logo" onClick={() => handleMenuItemClick(ROUTES.ROOT)}>
          <p>&#128302;</p>
        </div>

        <div className="menu-list">
          {
            menuList.map(menu => (
              <div key={menu.title} className={`menu-item ${isActive(menu.href)}`} onClick={() => handleMenuItemClick(menu.href)}>
                { menu.title }
              </div>
            ))
          }
        </div>
    </HeaderWrapper>
  );
};

export default TheHeader;
