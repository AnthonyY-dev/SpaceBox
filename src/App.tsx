import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import ItemDataPage from "./pages/ItemDataPage";
import MoveHome from "./pages/MoveHome";
import NewItem from "./pages/NewItem";
import SpaceDataPage from "./pages/SpaceDataPage";
import { Toaster } from "@/components/ui/toaster";
import BoxDataPage from "./pages/BoxDataPage";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/item/:id" element={<ItemDataPage />} />
        <Route path="/item/:id/move" element={<MoveHome />} />
        <Route path="/new" element={<NewItem />} />
        <Route path="/space/:id" element={<SpaceDataPage />} />
        <Route path="/box/:id" element={<BoxDataPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
