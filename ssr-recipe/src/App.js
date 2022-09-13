import { Route, Routes } from 'react-router-dom';
import Menu from "./components/Menu";
import RedPage from "./pages/RedPage";
import BluePage from "./pages/BluePage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
      <div>
        <Menu />
        <hr />
        <Routes>
          <Route path="/red" element={<RedPage />} />
          <Route path="/blue" element={<BluePage />} />
          <Route path="/users/*" element={<UsersPage />} />
        </Routes>
      </div>
  );
};

export default App;