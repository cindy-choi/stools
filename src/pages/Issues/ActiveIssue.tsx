import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import StatusManager from './StatusManager';
import type Issue from '@/types/Issue';

const ActiveIssueWrapper = styled.div`
  height: 100%;
  padding: 24px;
  display: grid;
  grid-template-rows: 5fr 4fr;
  gap: 24px;

  .additional-info {
    background: var(--black-05);
  }
`;

const TimeTracker = styled.div`
  width: 100%;
  background: var(--black-05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  align-items: center;

  .issue-info {
    word-break: break-word;
    white-space: break-spaces;
    border-bottom: 1px solid var(--black-05);
    margin-bottom: 24px;
    padding: 12px;

    h2 {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
  }

  p.status {
    margin-right: 10rem;
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
`;

const History = styled.div`
`;

const ProjectInfo = styled.div`
`;

function ActiveIssue({ issue }: { issue: Issue|null, }) {
  const hours = '01';
  const minutes = '20';
  const { t } = useTranslation();

  return (
    <ActiveIssueWrapper>
      {
        issue ? (
          <>
            <TimeTracker>
              <div className="issue-info">
                <h2>{ issue?.title }</h2>
                <a href={issue?.link}>{ issue?.link  || t('issue.no.link') }</a>
              </div>

              <p className="status">{ t(`issue.status.${issue?.status}`) }</p>

              <div className="timer">
                <div className="hour">{ hours }</div>
                <p> : </p>
                <div className="minute">{ minutes }</div>
              </div>

              <StatusManager
                defaultStatus={issue?.status}
              />

            </TimeTracker>
            <div className="additional-info">
              <History>
              </History>

              <ProjectInfo>
              </ProjectInfo>
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
