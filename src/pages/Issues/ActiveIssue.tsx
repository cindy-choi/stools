import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Window from '@/components/Window';
import AuditLog from './AuditLog';
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

const ActiveIssueWrapper = styled.div`
  height: 100%;
  padding: 24px;
  display: grid;
  grid-template-rows: 5fr 4fr;
  gap: 24px;

  .additional-info {
  }
`;

const TimeTracker = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  .issue-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    word-break: break-word;
    white-space: break-spaces;
    border-bottom: 1px solid var(--black-05);
    margin-bottom: 24px;
    padding-bottom: 12px;

    h2 {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
  }

  p.count {
    margin-right: auto;
    font-size: 12px;
    border-radius: 20px;
    background: var(--black-20);
    color: var(--black-50);
    padding: 8px 12px;
  }

  .timer {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 4rem;
    font-weight: 500;
    padding: 12px;
    text-align: center;
    p { margin: 0 8px; }
  }

  .actions {
    margin: 2rem 0;
  }
`;

const History = styled.div`
`;

const ProjectInfo = styled.div`
`;

function ActiveIssue({ issue }: { issue: Issue|null, }) {
  const hours = '01';
  const minutes = '20';
  const seconds = '20';
  const { t } = useTranslation();
  const [play, setPlay] = useState<boolean>(false);

  const handleSave = () => {};

  return (
    <ActiveIssueWrapper>
      {
        issue ? (
          <>
            <Window>
              <TimeTracker>
                <div className="issue-info">
                  <h2>{ issue?.title }</h2>
                  <a target="_blank" href={issue?.link}>{ issue?.link  || t('issue.no.link') }</a>
                </div>

                <p className="count">Lap 1</p>

                <div className="timer">
                  <div className="hour">{ hours||'--' }</div>
                  <p> : </p>
                  <div className="minute">{ minutes||'--' }</div>
                  <p> : </p>
                  <div className="seconds">{ seconds||'--' }</div>
                </div>

                <div className="actions">
                  <IconButton onClick={() => setPlay(!play)}>
                    { play ?  <span className="material-icons"> play_arrow </span> : <span className="material-icons"> pause </span> }
                  </IconButton>
                </div>
              </TimeTracker>
            </Window>

            <div className="additional-info">
              <AuditLog
                issue={issue}
              />
            </div>
          </>
        ) : (
          <span>선택한 이슈가 없습니다</span>
        )
      }
    </ActiveIssueWrapper>
  );
};

export default ActiveIssue;
