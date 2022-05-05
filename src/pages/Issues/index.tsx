import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Storage from '@/storage';
import BoxButton from '@/components/BoxButton';
import { useNavigate } from 'react-router-dom';

import AddIssueModal from './AddIssueModal';

import type Issue from '@/types/Issue';

const IssuesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  padding: 1rem;

  .status-sorted {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 100%;
  }
`;

const List = styled.div<{ color: string, index: number }>`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  height: 100%;
  overflow: visible;

  .title {
    padding: .2rem;
    width: 16rem;
    height: 3rem;
    background: var(--${props => props.color});
    transform: skewX(-10deg);
    overflow: visible;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-left: 2rem;
      margin-bottom: .5rem;
    }

    div.square {
      border: 2px solid var(--black);
      height: 1rem;
      position: relative;
      top: calc(-0.2 * ${props => props.index}rem);
      left: calc(-3rem + 4 * ${props => props.index}rem);
    }
  }

  .title-util {
    display: flex;
    justify-content: space-between;

    > div { margin-right: 4rem; }
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
  width: 100%;
  height: 3rem;
  cursor: pointer;
  transition: .3s ease;

  p { font-size: 1.4rem; }

  &:hover {
    background: var(--black-10);
  }
`;

const SideSlider = styled.div<{ open: boolean }>`
  width: ${props => props.open ? '25rem': '2rem'};
  height: calc(100% - 100px);
  margin-left: auto;
  transition: .5s ease;
  display: flex;
  align-items: center;
  position: absolute;
  right: ${props => props.open ? '21px': '0'};
  top: 80px;

  div.handle {
    border-radius: 8px 0 0 8px;
    background: var(--white);
    height: 2rem;
    display: flex;
    align-items: center;
    border: 1px solid var(--black-50);
    border-right: none;
    z-index: 2;
    cursor: pointer;
    position: relative;
    left: 1px;

    span.material-icons {
      color: var(--black-60);
      transition: .2s ease;
    }

    &:hover span.material-icons {
      color: var(--black-50);
    }

    &:focus span.material-icons,
    &:active span.material-icons {
      color: var(--black);
    }

  }

  div.content {
    width: 100%;
    height: 100%;
    border: 1px solid var(--black-50);
    h2, div.item-list { display: ${props => props.open ? 'flex' : 'none'}; }
    box-shadow: 7px 5px 0 0 var(--black);
    
    h2 {
      margin: 2rem;
    }
  }

  div.item-list {
    width: 100%;;
    padding: 1rem;
    background: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border-top: 1px solid var(--black-50);

    div.item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border: 2px solid var(--black-80);
      width: 95%;
      height: 4rem;
      cursor: pointer;
      border-radius: 8px;
      color: var(--black-80);
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
      font-weight: 300;
      white-space: break-spaces;
      word-break: break-all;
      padding: 0 2rem;
      transition: .2s ease;

      &:hover {
        color: var(--white);
        background: var(--primary);
        transform: scale(1.1);
        font-weight: 500;
      }
    }
  }
`;

export const Issues = () => {
  const navigate = useNavigate();
  const [openRecent, setOpenRecent] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [issues, setIssues] = useState<Array<Issue>|null>(null);
  const [todos, setTodos] = useState<Array<Issue>|null>(null);
  const [doings, setDoings] = useState<Array<Issue>|null>(null);

  const getIssues = async () => {
    const issues = await Storage.getAllIssue();
    setIssues(issues);
    setTodos(issues.filter((issue: Issue) => issue.status === 'created'));
    setDoings(issues.filter((issue : Issue)=> issue.status === 'processing'));
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
    getIssues();
  };

  const handleClickIssue = (id: string) => {
    navigate(`/issues/${id}`);
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <IssuesWrapper>
      <div className="status-sorted">
        <List color="green" index={1}>
          <div className="title">
            <h1>Doing</h1>
            <div className="square" />
          </div>

          <div className="item-list">
            {
              (doings && doings.length > 0) ? doings.map(issue => (
                <Item onClick={() => handleClickIssue(issue.id)}>
                  <p>{ issue.title }</p>
                </Item>
              )) : <span> No Issues. </span>
            }
          </div>
        </List>
        <List color="yellow" index={2}>
          <div className="title-util">
            <div className="title">
              <h1>To Do</h1>
              <div className="square" />
            </div>
            <BoxButton onClick={() => setOpenAddModal(true)}>
              NEW ISSUE
            </BoxButton>
          </div>

          <div className="item-list">
            {
              (todos && todos.length > 0) ? todos.map(issue => (
                <Item onClick={() => handleClickIssue(issue.id)}>
                  <p>{ issue.title }</p>
                </Item>
              )) : <span> No Issues. </span>
            }

          </div>
        </List>
      </div>

      <SideSlider open={openRecent}>
        <div className="handle" onClick={() => setOpenRecent(!openRecent)}>
          <span className="material-icons">chevron_left</span>
        </div>

        <div className="content">
          <h2> Recently worked </h2>

          <div className="item-list">
            {
              (todos && todos.length > 0) ? todos.map(issue => (
                <div className="item"> { issue.title } </div>
              )) : <span> No Issues. </span>
            }
          </div>
        </div>
      </SideSlider>

      <AddIssueModal 
        open={openAddModal}
        onClose={handleAddClose}
      />
    </IssuesWrapper>
   );
};

export default Issues;
