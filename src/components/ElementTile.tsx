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
  gridRow?: number;
  gridColumn?: number;
  onClick: (element: PeriodicElement) => void;
}

export const ElementTile: React.FC<ElementTileProps> = React.memo(
  ({
    element,
    isSelected = false,
    isDimmed = false,
    isMatch = false,
    gridRow,
    gridColumn,
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
          gridColumn: gridColumn ?? element.xpos,
          gridRow: gridRow ?? element.ypos + 1,
          width: "100%",
          minWidth: { xs: 50, sm: 56, md: 62 },
          height: { xs: 58, sm: 64, md: 70 },
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-between",
          p: "3px 5px",
          borderRadius: "6px",
          background: isSelected
            ? `linear-gradient(135deg, ${categoryInfo.color}38 0%, ${categoryInfo.color}18 100%)`
            : categoryInfo.bgGradient,
          border: `1px solid ${
            isSelected
              ? categoryInfo.color
              : isMatch
                ? `${categoryInfo.borderHover}aa`
                : "rgba(255, 255, 255, 0.07)"
          }`,
          borderTop: `2.5px solid ${categoryInfo.color}`,
          opacity: isDimmed ? 0.22 : 1,
          filter: isDimmed ? "grayscale(70%)" : "none",
          transition: "all 0.16s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: isSelected
            ? `0 0 14px ${categoryInfo.color}55`
            : isMatch
              ? `0 0 8px ${categoryInfo.color}38`
              : "0 1px 3px rgba(0,0,0,0.25)",
          "&:hover": {
            transform: isDimmed ? "none" : "translateY(-2px) scale(1.03)",
            border: `1px solid ${categoryInfo.borderHover}`,
            borderTop: `2.5px solid ${categoryInfo.borderHover}`,
            boxShadow: `0 6px 18px ${categoryInfo.color}45`,
            zIndex: 10,
            opacity: 1,
            filter: "none",
          },
          "&:focus-visible": {
            outline: `2px solid ${categoryInfo.borderHover}`,
            outlineOffset: "1px",
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
              fontSize: { xs: "0.56rem", sm: "0.62rem" },
              fontWeight: 600,
              color: "text.secondary",
              letterSpacing: "-0.3px",
            }}
          >
            {element.number}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "0.48rem", sm: "0.54rem" },
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
              fontSize: { xs: "1.05rem", sm: "1.18rem", md: "1.28rem" },
              fontWeight: 800,
              lineHeight: 1.05,
              color: isSelected ? "#ffffff" : "text.primary",
              textShadow: isSelected ? `0 0 8px ${categoryInfo.color}` : "none",
              letterSpacing: "-0.4px",
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
              fontSize: { xs: "0.52rem", sm: "0.58rem" },
              fontWeight: 500,
              color: "text.primary",
              opacity: 0.9,
              letterSpacing: "-0.2px",
              mb: "0.5px",
            }}
          >
            {element.name}
          </Typography>
          <Typography
            component="span"
            noWrap
            sx={{
              display: "block",
              fontSize: { xs: "0.46rem", sm: "0.52rem" },
              color: "text.secondary",
              opacity: 0.72,
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
