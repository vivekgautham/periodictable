import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PeriodicTablePage } from "./components/PeriodicTablePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PeriodicTablePage />} />
      <Route path="/element/:id" element={<PeriodicTablePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
