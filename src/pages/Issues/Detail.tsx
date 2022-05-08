import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Window from '@/components/Window';
import Timer from '@/components/Timer';
import AuditLog from './AuditLog';
import Storage from '@/storage';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import type Issue from '@/types/Issue';

const IconButton = styled.div`
  display: flex;
  align-items: center;
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

const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: grid;
  grid-template-rows: auto auto 3fr;
  gap: 24px;

  .additional-info {
    margin-top: 2rem;
  }

  .back {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--black-80);
    line-height: 18px;
    cursor: pointer;
    span.material-icons { font-size: 18px; margin-right: 4px; }

    &:hover { color: var(--black-50); }
  }
`;

const ItemDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space;
  padding: 24px;

  .issue-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid var(--black-05);
    margin-bottom: 24px;
    padding-bottom: 12px;

    .title {
      word-break: break-word;
      white-space: break-spaces;

      h2 {
        font-size: 3rem;
        font-weight: 500;
        margin-bottom: 8px;
      }
    }

    div.status-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 7rem;
      height: 2rem;
      border: 2px solid var(--black-30);
      color: var(--black-30);
      border-radius: 12px;
      cursor: default;
    }
  }
`;

function Detail() {
  const { t } = useTranslation();
  const [estimateTime, setEstimateTime] = useState<number>(0);
  const [issue, setIssue] = useState<Issue|null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    if (!id) return;
    const response = await Storage.getIssue(id);
    setIssue(response);
  };

  const saveHistory = async () => {
    if (!issue) return;

    await Storage.updateIssue(issue);
  };

  const handleClickComplete = () => {
    if (issue?.status === 'finished') {
    } else {
    }
  };

  const handleStart = () => {
    if (!issue) return;

    if (issue?.status !== 'processing') {
      Storage.updateIssue({...issue, status: 'processing'});
    }

    getData();
  };

  const handleTimeChange = (counter: number, start: Date, end: Date) => {
    setEstimateTime(counter);

    if (!issue) return;
    const duration = moment.duration(moment(end).diff(moment(start)));
    const after = issue?.audits;
    after.push({ startDate: start, endDate: end, });

    setIssue({
      ...issue,
      audits: after,
      estimatedTime: issue?.estimatedTime + duration.milliseconds(),
    });
    saveHistory();
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <DetailWrapper>
      <div className="back" onClick={() => navigate('/issues')}>
        <span className="material-icons">reply</span> Back
      </div>
      <Window style={{width: '100%'}} variant="secondary">
        <ItemDetail>
          <div className="issue-info">
            <div className="title">
              <h2>{ issue?.title }</h2>
              <a target="_blank" href={issue?.link}>{ issue?.link  || t('issue.no.link') }</a>
            </div>

            <div className="status-button" onClick={handleClickComplete}>
              { t(issue?.status || 'created') }
            </div>
          </div>

          <Timer
            onStart={handleStart}
            onChange={handleTimeChange}
          />
        </ItemDetail>
      </Window>

      <div className="additional-info">
        <AuditLog issue={issue} />
      </div>
    </DetailWrapper>
  );
};

export default Detail;
