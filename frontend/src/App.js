import { styled } from "styled-components";
import bg from "./images/bg.png";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./components/Navigation/Navigation";
import { useMemo, useState } from "react";
import Orb from "./components/Orb";
import Dashboard from "./components/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Incomes from "./components/Incomes/Incomes";
import { useGlobalContext } from "./context/globalContext";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Suggestions from "./components/Suggestions/Suggestions";

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      case 5:
        return <ProductDetails />;
      case 6:
        return (
          <iframe
            src="../../sis-master/templates/index.html"
            title="Search Engine"
          />
        );
      default:
        return <Dashboard />;
    }
  };
  return (
    <AppStyle bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main> {displayData()}</main>
      </MainLayout>
    </AppStyle>
  );
}

const AppStyle = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
