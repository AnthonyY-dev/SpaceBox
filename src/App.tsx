import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import ItemDataPage from "./pages/ItemDataPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/item/:id" element={<ItemDataPage />} />
      </Routes>
    </Router>
  );
};

export default App;
