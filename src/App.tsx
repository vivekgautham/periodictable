import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 6, textAlign: "center" }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Periodic Table
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Base infrastructure initialized. Ready for components and features.
        </Typography>
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
