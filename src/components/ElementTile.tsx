import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { getCategoryInfo } from "../data/categories";
import { PeriodicElement } from "../types/element";

interface ElementTileProps {
  element: PeriodicElement;
  isSelected?: boolean;
  isDimmed?: boolean;
  isMatch?: boolean;
  isCompressed?: boolean;
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
    isCompressed = false,
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

    const tileNode = (
      <ButtonBase
        onClick={() => onClick(element)}
        focusRipple
        sx={{
          gridColumn: gridColumn ?? element.xpos,
          gridRow: gridRow ?? element.ypos + 1,
          width: "100%",
          minWidth: isCompressed
            ? { xs: 26, sm: 30, md: 34 }
            : { xs: 50, sm: 56, md: 62 },
          height: isCompressed
            ? { xs: 38, sm: 44, md: 48 }
            : { xs: 58, sm: 64, md: 70 },
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: isCompressed ? "center" : "space-between",
          p: isCompressed ? "1px 2px" : "3px 5px",
          borderRadius: "6px",
          background: isSelected
            ? `linear-gradient(135deg, ${categoryInfo.color}40 0%, ${categoryInfo.color}18 100%)`
            : categoryInfo.bgGradient,
          border: `1px solid ${
            isSelected
              ? categoryInfo.color
              : isMatch
                ? `${categoryInfo.borderHover}aa`
                : "rgba(255, 255, 255, 0.07)"
          }`,
          borderTop: `${isCompressed ? "2px" : "2.5px"} solid ${categoryInfo.color}`,
          opacity: isDimmed ? 0.22 : 1,
          filter: isDimmed ? "grayscale(70%)" : "none",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: isSelected
            ? `0 0 14px ${categoryInfo.color}66`
            : isMatch
              ? `0 0 8px ${categoryInfo.color}38`
              : "0 1px 3px rgba(0,0,0,0.25)",
          "&:hover": {
            transform: isDimmed
              ? "none"
              : isCompressed
                ? "translateY(-1.5px) scale(1.08)"
                : "translateY(-2px) scale(1.03)",
            border: `1px solid ${categoryInfo.borderHover}`,
            borderTop: `${isCompressed ? "2px" : "2.5px"} solid ${categoryInfo.borderHover}`,
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
        {/* Top row: atomic number (and block when not compressed) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isCompressed ? "center" : "space-between",
            alignItems: "center",
            width: "100%",
            lineHeight: 1,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: isCompressed
                ? { xs: "0.48rem", sm: "0.54rem" }
                : { xs: "0.56rem", sm: "0.62rem" },
              fontWeight: 600,
              color: isCompressed ? "text.primary" : "text.secondary",
              letterSpacing: "-0.3px",
              opacity: isCompressed ? 0.75 : 1,
            }}
          >
            {element.number}
          </Typography>
          {!isCompressed && (
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
          )}
        </Box>

        {/* Center: element symbol */}
        <Box sx={{ textAlign: "center", my: isCompressed ? 0.2 : "auto" }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              fontSize: isCompressed
                ? { xs: "0.8rem", sm: "0.9rem", md: "0.98rem" }
                : { xs: "1.05rem", sm: "1.18rem", md: "1.28rem" },
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

        {/* Bottom: element name and atomic mass (hidden when compressed) */}
        {!isCompressed && (
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
        )}
      </ButtonBase>
    );

    if (isCompressed) {
      return (
        <Tooltip
          title={`${element.number}. ${element.name} (${element.symbol}) • ${formattedMass} u`}
          arrow
          enterDelay={150}
        >
          {tileNode}
        </Tooltip>
      );
    }

    return tileNode;
  },
);

ElementTile.displayName = "ElementTile";
