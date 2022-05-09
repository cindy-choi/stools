import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Wrapper = styled.div<{ status: string, animationCount: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 2.5rem;
  border-radius: 8px;
  font-size: .7rem;
  cursor: ${props => props.status === 'processing' ? 'pointer' : 'default'};

  span {
    animation: animation-${props => props.status} ${props => props.status === 'processing' ? '1s cubic-bezier(0.6, -0.28, 0.74, 0.05)' : '0.5s'};
    animation-iteration-count: ${props => props.animationCount};
    color: var(--issue-${props => props.status}-color);
  }

  div.tooltip {
    position: relative;
    top: -2.5rem;
    height: 1rem;
    width: 1rem;
    color: black;
  }
`;

export function IssueStatus({ status = 'created', makeFinish }: { status?: string, makeFinish?: () => void }) {
  const { t } = useTranslation();
  const [animation, setAnimation] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  const setVisual = () => {
    switch(status) {
      case 'created':
        setAnimation('shake');
        setIcon('notifications');
        break;
      case 'processing':
        setAnimation('shake');
        setIcon('motion_photos_on');
        break;
      case 'holding':
        setAnimation('none');
        setIcon('notifications');
        break;
      case 'finished':
        setAnimation('none');
        setIcon('task_alt');
        break;
    }
  };

  const getOverMessage = () => {
    switch (status) {
      case 'created':
        return 'New issue created!';
      case 'processing':
        return 'Click to finish.';
      case 'holding':
        return '';
      case 'finished':
        return 'You have done this.';
    }
  };

  const getAnimationCount = () => {
    let count: string = '1';

    switch (status) {
      case 'created':
        count = '1';
        break;
      case 'processing':
        count = 'infinite';
        break;
      case 'holding':
        count =  '';
        break;
      case 'finished':
        count =  '1';
        break;
    }

    return count;
  };

  const handleClick = () => {
    if (status !== 'processing') return;
    makeFinish && makeFinish();
  };

  useEffect(() => {
    setVisual();
  }, [status]);

  return (
    <Wrapper status={status} animationCount={getAnimationCount()} onClick={handleClick}>
      <OverlayTrigger
        placement="top"
        overlay={ (props) => <Tooltip id="status-tooltip" {...props}>
          { getOverMessage() }
        </Tooltip> }
      >
        {/* @ts-ignore */}
        <span className="material-icons">{ icon }</span>
      </OverlayTrigger>
    </Wrapper>
  );
};

export default IssueStatus;
