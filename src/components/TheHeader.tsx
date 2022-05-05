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
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-family: 'Material Icons';
    color: var(--black-80);
    padding: 0 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: .3s ease;

    &:hover:not(.active) {
      .underline {
        width: 130%;
        background-color: var(--secondary);
      }
    }

    &.active {
      transform: scale(1.2);
      font-weight: 700;
      color: var(--black);

      .underline {
        width: 130%;
        background-color: var(--primary);
        opacity: .8;
      }
    }
  }

  .menu-item .underline {
    height: 20px;
    width: 0;
    transform: skewX(-10deg);
    background-color: var(--primary);
    transition: .3s ease;
    position: relative;
    top: -10px;
    z-index:-1;
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
    navigate(href);
  };

  const isActive = (href: string) => {
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
              <div className="underline"></div>
            </div>
          ))
        }
      </div>
    </HeaderWrapper>
  );
};

export default TheHeader;
