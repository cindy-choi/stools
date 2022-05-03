import React, { useState } from 'react';
import styled from 'styled-components';
import type Issue from '@/types/Issue';

import ActiveIssue from './ActiveIssue';
import IssueList from './IssueList';

const IssuesWrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
`;

export const Issues = () => {
  const [selected, setSelected] = useState<Issue|null>(null);
  return (
    <IssuesWrapper>
      <ActiveIssue
        issue={selected}
      />
      <IssueList
        selected={selected}
        onSelect={(target) => setSelected(target)}
      />
    </IssuesWrapper>
   );
};

export default Issues;
