import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import moment from 'moment';
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

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  background: var(--black-15);

  span.material-icons {
    opacity: 0;
  }

  &:hover {
    span.material-icons {
      opacity: 1;
    }
  }
`;

function AuditLog({ issue }: { issue: Issue|null, }) {
  const { t } = useTranslation();

  const getEstimateTime = (start: Date, end: Date) => {
    const _start = moment(start);
    const _end = moment(end);

    const duration = moment.duration(_end.diff(_start));
    const days = duration.days() ? `${duration.days()}D ` : '';
    const hours = duration.hours() ? `${duration.hours()}H ` : '';
    const minutes = duration.minutes() ? `${duration.minutes()}M ` : '';
    const seconds = duration.seconds() ? `${duration.seconds()}S` : '';
    
    return `${days}${hours}${minutes}${seconds}`;
  };

  return (
    <AuditLogWrapper>
      <Title>
        <h1>Work History</h1>
        <div className="squares">
          <div className="square-colored"/>
          <div className="square"/>
        </div>
      </Title>

      {/* TODO : chart */}
      <Contents>
      {
        issue?.audits?.map((log, index) => (
          <Item key={`log-${index}`}>
            <p className="log-dates">
              <span>{ moment(log.startDate).format('MM/DD HH:mm')}</span>
              <span>~</span>
              <span>{ moment(log.endDate).format('MM/DD HH:mm')}</span>
            </p>
            <p className="log-esitmated-time">{ getEstimateTime(log.startDate, log.endDate) }</p>

            <span className="material-icons">clear</span>
          </Item>
        ))
      }
      </Contents>
    </AuditLogWrapper>
  );
};

export default AuditLog;
