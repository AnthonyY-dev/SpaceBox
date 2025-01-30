import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import ItemDataPage from "./pages/ItemDataPage";
import MoveHome from "./pages/MoveHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/item/:id" element={<ItemDataPage />} />
        <Route path="/item/:id/move" element={<MoveHome />} />
      </Routes>
    </Router>
  );
};

export default App;
