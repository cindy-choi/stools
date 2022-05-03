import styled from 'styled-components';

const StyledWindow = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--black);
  width: fit-content;
  height: fit-content;
  box-shadow: -webkit-box-shadow: 7px 5px 0px 0px var(--black); 
  box-shadow: 7px 5px 0px 0px var(--black);
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


type WindowProps = React.PropsWithChildren<{
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
}> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function Window({ children, variant = "primary", ...rest }: WindowProps ) {
  return (
    <StyledWindow className={`${variant} ${rest.className}`} style={rest.style}>
      <Head>
        <div className="dot first" />
        <div className="dot second" />
        <div className="dot third" />
      </Head>
      <Body>
        { children }
      </Body>
    </StyledWindow>
  );
};

export default Window;
