import styled from 'styled-components';

const StyledButtonWrapper = styled.div<{ variant: string, boxType: string }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid ${props => props.variant === 'light' ? 'var(--white)' : 'var(--black)'};
  width: fit-content;
  height: fit-content;
  box-shadow: -webkit-box-shadow: 7px 5px 0px 0px ${props => props.variant === 'light' ? 'var(--white)' : 'var(--black)'}; 
  padding: 8px 20px;
  box-shadow: 7px 5px 0px 0px ${props => props.variant === 'light' ? 'var(--white)' : 'var(--black)'};
  color: ${props => props.variant === 'light' ? 'var(--white)' : 'var(--black)'};
  background: var(--${props => props.variant});
  transform: ${props => props.boxType === 'parallelogram' ? ' skewX(-10deg)' : 'none'};
  border-radius: ${props => props.boxType === 'rounded' ? '20px' :'0'};
`;

const Head = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 2px solid var(--black);
  background: var(--primary);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;

  div.dot {
    width: 15px;
    height: 15px;
    border: 2px solid var(--black);
    border-radius: 50%;

    &.first { background: #04ff00; }
    &.second { background: #ffc800; }
    &.third { background: #ff0085; }
  }
`;
const Body = styled.div`
`;


type BoxButtonProps = React.PropsWithChildren<{
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  boxType?: "rectangle" | "parallelogram" | "rounded";
}> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function BoxButton({ children, variant = "primary", boxType = "rectangle", ...rest }: BoxButtonProps ) {
  return (
    <StyledButtonWrapper variant={variant} boxType={boxType} className={rest.className} style={rest.style}>
    { children }
    </StyledButtonWrapper>
  );
};

export default BoxButton;
