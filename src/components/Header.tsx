import CasinoIcon from "@mui/icons-material/Casino";
import ScienceIcon from "@mui/icons-material/Science";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

interface HeaderProps {
  onRandomElement: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRandomElement }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        pt: 3,
        pb: 2.5,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.35)",
          }}
        >
          <ScienceIcon sx={{ color: "#ffffff", fontSize: 26 }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            component="h1"
            fontWeight={800}
            sx={{
              background: "linear-gradient(90deg, #f8fafc 0%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Periodic Table of Elements
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Explore 118 elements, atomic properties, orbital configs & physical
            states
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          alignSelf: { xs: "flex-end", sm: "center" },
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<CasinoIcon />}
          onClick={onRandomElement}
          sx={{
            borderColor: "rgba(255, 255, 255, 0.16)",
            color: "text.primary",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              borderColor: "primary.light",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
            },
          }}
        >
          Random Element
        </Button>
      </Box>
    </Box>
  );
};
