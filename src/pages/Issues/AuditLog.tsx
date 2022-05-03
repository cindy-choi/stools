import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Window from '@/components/Window';
import type Issue from '@/types/Issue';

const IconButton = styled.div`
  display: flex;
  algin-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: 4px solid var(--black);
  padding: 36px;
  box-shadow: 7px 5px 0 0 var(--black);
  transition: .3s ease;
  margin-bottom: 12px;

  &:hover {
    transform: scale(1.2);
    background: var(--secondary);
  }
  &:focus, &:active {
    transform: scale(1.1);
  }
`;

const AuditLogWrapper = styled.div`
`;

const Title = styled.div`
  h1 {
    font-weight: 700;
    font-size: 2rem;
  }

  div.squares {
    position: relative;
    top: -20px;
  }

  div.square {
    border: 3px solid var(--black);
    transform: skewX(-10deg);
    margin-left: auto;
    width: 250px;
    height: 30px;
    position: relative;
    top: -20px;
  }
  div.square-colored {
    width: 300px;
    height: 50px;
    margin-left: auto;
    background-color: #ffeffb;
    opacity: 0.8;
    background-image:  linear-gradient(135deg, #ff4ca9 25%, transparent 25%), linear-gradient(225deg, #ff4ca9 25%, transparent 25%), linear-gradient(45deg, #ff4ca9 25%, transparent 25%), linear-gradient(315deg, #ff4ca9 25%, #ffeffb 25%);
    background-position:  10px 0, 10px 0, 0 0, 0 0;
    background-size: 20px 20px;
    background-repeat: repeat;
    transform: skewX(-10deg);
  }
`;

const Contents = styled.div`
`;

function AuditLog({ issue }: { issue: Issue|null, }) {
  const { t } = useTranslation();

  return (
    <AuditLogWrapper>
      <Title>
        <h1>Work History</h1>
        <div className="squares">
          <div className="square-colored"/>
          <div className="square"/>
        </div>
      </Title>

      <Contents>
      {
        issue?.audits?.map(log => (
          <p>
            <span>log.startDate</span>
            <span>log.endDate</span>
            <span>{}</span>
          </p>
        ))
      }
      </Contents>
    </AuditLogWrapper>
  );
};

export default AuditLog;
