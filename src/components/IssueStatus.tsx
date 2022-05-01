import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const IssueStatusWrapper = styled.div`
  width: 40px;
  color: var(--black-30);
  font-size: 12px;

  // TODO
  &.created { }
`;

function IssueStatus({ status, }: { status: string, variant?: string }) {
  const { t } = useTranslation();

  return (
    <IssueStatusWrapper className={status}>
      <p>{t(`issue.status.${status}`)}</p>
    </IssueStatusWrapper>
  );
};

export default IssueStatus;
