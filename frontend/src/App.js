import { styled } from "styled-components";
import bg from "./images/bg.png";
import { MainLayout } from "./styles/Layouts";

function App() {
  return (
    <AppStyle bg={bg} className="App">
      <main>
        <MainLayout>
          <h1> heyy </h1>
        </MainLayout>
      </main>
    </AppStyle>
  );
}

const AppStyle = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
`;

export default App;
