import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import React from "react";
import { getCategoryInfo } from "../data/categories";
import { PeriodicElement } from "../types/element";

interface ElementTileProps {
  element: PeriodicElement;
  isSelected?: boolean;
  isDimmed?: boolean;
  isMatch?: boolean;
  onClick: (element: PeriodicElement) => void;
}

export const ElementTile: React.FC<ElementTileProps> = React.memo(
  ({
    element,
    isSelected = false,
    isDimmed = false,
    isMatch = false,
    onClick,
  }) => {
    const categoryInfo = getCategoryInfo(element.category);

    const formattedMass =
      typeof element.atomic_mass === "number"
        ? element.atomic_mass < 100
          ? element.atomic_mass.toFixed(3).replace(/\.?0+$/, "")
          : element.atomic_mass.toFixed(2).replace(/\.?0+$/, "")
        : element.atomic_mass;

    return (
      <ButtonBase
        onClick={() => onClick(element)}
        focusRipple
        sx={{
          gridColumn: element.xpos,
          gridRow: element.ypos,
          width: "100%",
          minWidth: { xs: 58, sm: 66, md: 72 },
          height: { xs: 68, sm: 76, md: 82 },
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-between",
          p: "4px 6px",
          borderRadius: "8px",
          background: isSelected
            ? `linear-gradient(135deg, ${categoryInfo.color}44 0%, ${categoryInfo.color}22 100%)`
            : categoryInfo.bgGradient,
          border: `1px solid ${
            isSelected
              ? categoryInfo.color
              : isMatch
                ? `${categoryInfo.borderHover}bb`
                : "rgba(255, 255, 255, 0.08)"
          }`,
          borderTop: `3px solid ${categoryInfo.color}`,
          opacity: isDimmed ? 0.22 : 1,
          filter: isDimmed ? "grayscale(70%)" : "none",
          transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: isSelected
            ? `0 0 16px ${categoryInfo.color}66`
            : isMatch
              ? `0 0 10px ${categoryInfo.color}44`
              : "0 2px 4px rgba(0,0,0,0.3)",
          "&:hover": {
            transform: isDimmed ? "none" : "translateY(-3px) scale(1.04)",
            border: `1px solid ${categoryInfo.borderHover}`,
            borderTop: `3px solid ${categoryInfo.borderHover}`,
            boxShadow: `0 8px 24px ${categoryInfo.color}55`,
            zIndex: 10,
            opacity: 1,
            filter: "none",
          },
          "&:focus-visible": {
            outline: `2px solid ${categoryInfo.borderHover}`,
            outlineOffset: "2px",
            zIndex: 11,
          },
        }}
      >
        {/* Top row: atomic number and block */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            lineHeight: 1,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "0.62rem", sm: "0.7rem" },
              fontWeight: 600,
              color: "text.secondary",
              letterSpacing: "-0.5px",
            }}
          >
            {element.number}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "0.55rem", sm: "0.62rem" },
              fontWeight: 500,
              textTransform: "uppercase",
              color: `${categoryInfo.color}dd`,
              opacity: 0.85,
            }}
          >
            {element.block}
          </Typography>
        </Box>

        {/* Center: element symbol */}
        <Box sx={{ textAlign: "center", my: "auto" }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              fontSize: { xs: "1.15rem", sm: "1.35rem", md: "1.5rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              color: isSelected ? "#ffffff" : "text.primary",
              textShadow: isSelected ? `0 0 8px ${categoryInfo.color}` : "none",
              letterSpacing: "-0.5px",
            }}
          >
            {element.symbol}
          </Typography>
        </Box>

        {/* Bottom: element name and atomic mass */}
        <Box sx={{ width: "100%", textAlign: "center", lineHeight: 1 }}>
          <Typography
            component="span"
            noWrap
            sx={{
              display: "block",
              fontSize: { xs: "0.58rem", sm: "0.65rem" },
              fontWeight: 500,
              color: "text.primary",
              opacity: 0.9,
              letterSpacing: "-0.2px",
              mb: "1px",
            }}
          >
            {element.name}
          </Typography>
          <Typography
            component="span"
            noWrap
            sx={{
              display: "block",
              fontSize: { xs: "0.52rem", sm: "0.58rem" },
              color: "text.secondary",
              opacity: 0.75,
              fontWeight: 400,
            }}
          >
            {formattedMass}
          </Typography>
        </Box>
      </ButtonBase>
    );
  },
);

ElementTile.displayName = "ElementTile";
