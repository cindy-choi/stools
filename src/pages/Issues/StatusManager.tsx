import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type Issue from '@/types/Issue';

const StatusManagerWrapper = styled.div`
  width: 500px;
  height: 200px;
  background: var(--black-10);
  display: flex;
  align-items: center;
  padding: 24px;

  div.rail {
    width: 100%;
    height: 2px;
    background: var(--black-10);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Handle = styled.button`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: var(--primary);
  position: relative;
  top: 0;
  left: 0;

`;

function StatusManager({ defaultStatus }: { defaultStatus: string, }) {
  return (
    <StatusManagerWrapper>
      <div className="rail">
        <div className="before" />
        <div className="on" />
        <div className="done" />
      </div>

      <Handle />
    </StatusManagerWrapper>
  );
};

export default StatusManager;
