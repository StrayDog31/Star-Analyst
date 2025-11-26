import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/MainPage";
import LandingPage from "./pages/Landing";
import ClassDetailPage from "./pages/ClassDetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/normalized.css";
import "./styles/variables.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/classes" element={<HomePage />} />
        <Route path="/class/:id" element={<ClassDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
