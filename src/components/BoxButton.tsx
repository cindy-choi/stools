import styled from 'styled-components';

const StyledButtonWrapper = styled.div<{ variant: string, boxType: string, width: string, height: string}>`
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: visible;
  cursor: pointer;
  > div { transition: .2s ease; }

  div.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 2px solid ${props => props.variant === 'white' ? 'var(--white)' : 'var(--black)'};
    width: ${props => props.width};
    height: ${props => props.height};
    color: ${props => props.variant === 'white' ? 'var(--white)' : 'var(--black)'};
    background: var(--${props => props.variant});
    transform: ${props => props.boxType === 'parallelogram' ? ' skewX(-10deg)' : 'none'};
    border-radius: ${props => props.boxType === 'rounded' ? '20px' :'0'};
    position: relative;
    top: -${props => props.height};
  }

  div.shadow {
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${props => props.variant === 'white' ? 'var(--white)' : 'var(--black)'};
    position: relative;
    top: 7px;;
    left: 5px
  }

  &:hover:not(:active):not(:focus) {
    div.body {
      color: var(--red);
      border-color: var(--red);
    }
    div.shadow {
      background: var(--red);
    }
  }
  &:active, &:focus {
    div.body {
      background: var(--${props => props.variant}-90);
      transform: translateX(3px) translateY(4px);
    }
  }
`;


type BoxButtonProps = React.PropsWithChildren<{
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "black";
  boxType?: "rectangle" | "parallelogram" | "rounded";
  width?: string;
  height?: string;
}> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function BoxButton({ children, width = '9rem', height = '2.5rem', variant = "primary", boxType = "rectangle", ...rest }: BoxButtonProps ) {
  return (
    <StyledButtonWrapper
      variant={variant}
      boxType={boxType}
      width={width}
      height={height}
      className={rest.className}
      style={rest.style}
      onClick={rest.onClick}
    > 
      <div className="shadow"></div>
      <div className="body">
        { children }
      </div>
    </StyledButtonWrapper>
  );
};

export default BoxButton;
