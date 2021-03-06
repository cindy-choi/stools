import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Storage from '@/storage';
import AddIssueModal from './AddIssueModal';
import type Issue from '@/types/Issue';

const IssueListWrapper = styled.div`
  height: 100%;
  padding: 24px;

  .utils {
    display: flex;
    justify-content: flex-end;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow: hidden;
  border: 2px dashed var(--black);
`;

const Item = styled.div<{ active: boolean }>`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  border-radius: 8px;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
  padding: 0 12px;
  transition: .3s ease;

  &:hover {
    background: var(--primary-30);
  }

  span.dot {
    background: var(--primary);
    border: 1px solid var(--primary);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }

  div.title {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--black-60);
    margin-right: auto;
  }
`;

const AddButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background: var(--primary);
  border-radius: 50%;
  font-size: 2rem;
  transition: .2s ease;
  cursor: pointer;

  &:hover { opacity: .8; }
  &:active, &:focus { opacity: .5; }
`;

function IssueList({ selected, onSelect, }: { selected?: Issue | null, onSelect: (target: Issue) => void, }, ) {
  const { t } = useTranslation();
  const [issues, setIssues] = useState<Array<Issue>>([]);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);

  const fetchIssues = () => {
    const issues = Storage.getAllIssue();
    setIssues(issues);
  };

  const handleClickAdd = () => {
    setOpenAddDialog(true);
  };

  const handleSelect = (target: Issue) => {
    onSelect(target);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <IssueListWrapper>
      <List>
        {
          issues?.length > 0 ? (
            issues.map(issue =>
              <Item active={selected?.id === issue.id} onClick={() => handleSelect(issue)}>
                <span className="dot" />
                <div className="title">{ issue.title }</div>
              </Item>
            )
          ) : (
            <p>{t('no.issues')}</p>
          )
        }
      </List>

      <AddIssueModal
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdded={() => fetchIssues()}
      />
    </IssueListWrapper>
  );
};

export default IssueList;
