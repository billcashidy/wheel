import logo from './logo.svg';
import './App.css';
import SpinWheel from './components/SpinWheel';
import { ContextProvider } from "./contexts/metamask/use-context";
import { Flex, Box } from 'rimble-ui';
import styled from 'styled-components'

function App() {
  const StyledFlex = styled(Flex)`
    background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  `
  return (
    <ContextProvider>
      <StyledFlex height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
        <Box>
          <SpinWheel />
        </Box>
      </StyledFlex>
    </ContextProvider>
  );
}

export default App;
