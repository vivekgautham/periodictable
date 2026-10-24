import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import React from "react";
import { CATEGORY_MAP, normalizeCategory } from "../data/categories";
import { CategoryKey, PeriodicElement } from "../types/element";
import { ElementTile } from "./ElementTile";

interface PeriodicGridProps {
  elements: PeriodicElement[];
  selectedElement: PeriodicElement | null;
  activeCategory: CategoryKey | "all";
  searchQuery: string;
  onSelectElement: (element: PeriodicElement) => void;
  onSelectCategory: (category: CategoryKey) => void;
}

export const PeriodicGrid: React.FC<PeriodicGridProps> = ({
  elements,
  selectedElement,
  activeCategory,
  searchQuery,
  onSelectElement,
  onSelectCategory,
}) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const isMatchingSearch = (element: PeriodicElement): boolean => {
    if (!normalizedQuery) return true;
    return (
      element.name.toLowerCase().includes(normalizedQuery) ||
      element.symbol.toLowerCase() === normalizedQuery ||
      element.symbol.toLowerCase().startsWith(normalizedQuery) ||
      element.number.toString() === normalizedQuery
    );
  };

  const isMatchingCategory = (element: PeriodicElement): boolean => {
    if (activeCategory === "all") return true;
    return normalizeCategory(element.category) === activeCategory;
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        pb: 3,
        pt: 1,
        // Smooth scrollbar styling
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: 4,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.28)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(18, minmax(64px, 1fr))",
          gridTemplateRows: "24px repeat(7, auto) 20px repeat(2, auto)",
          gap: { xs: "4px", sm: "6px" },
          minWidth: 1240,
          mx: "auto",
        }}
      >
        {/* Group Numbers: 1 to 18 Header Row */}
        {Array.from({ length: 18 }, (_, i) => i + 1).map((groupNum) => (
          <Box
            key={`group-${groupNum}`}
            sx={{
              gridColumn: groupNum,
              gridRow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 0.25,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "text.secondary",
                opacity: 0.7,
              }}
            >
              {groupNum}
            </Typography>
          </Box>
        ))}

        {/* Elements 1 - 118 */}
        {elements.map((element) => {
          const matchSearch = isMatchingSearch(element);
          const matchCat = isMatchingCategory(element);
          const isSelected = selectedElement?.number === element.number;
          const isDimmed = !matchSearch || !matchCat;
          const isHighlighted =
            (Boolean(normalizedQuery) && matchSearch) ||
            (activeCategory !== "all" && matchCat);

          return (
            <ElementTile
              key={element.number}
              element={element}
              isSelected={isSelected}
              isDimmed={isDimmed}
              isMatch={isHighlighted}
              onClick={onSelectElement}
            />
          );
        })}

        {/* Placeholder: Lanthanides indicator (Row 6, Col 3) */}
        <ButtonBase
          onClick={() => onSelectCategory("lanthanide")}
          sx={{
            gridColumn: 3,
            gridRow: 6,
            height: { xs: 68, sm: 76, md: 82 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            borderRadius: "8px",
            background: CATEGORY_MAP.lanthanide.bgGradient,
            border: `1px dashed ${CATEGORY_MAP.lanthanide.color}88`,
            borderTop: `3px solid ${CATEGORY_MAP.lanthanide.color}`,
            cursor: "pointer",
            transition: "all 0.18s ease",
            "&:hover": {
              borderColor: CATEGORY_MAP.lanthanide.borderHover,
              boxShadow: `0 0 12px ${CATEGORY_MAP.lanthanide.color}44`,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 800,
              color: CATEGORY_MAP.lanthanide.color,
            }}
          >
            57–71
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.62rem",
              color: "text.secondary",
              fontWeight: 600,
              mt: 0.5,
            }}
          >
            La–Lu
          </Typography>
        </ButtonBase>

        {/* Placeholder: Actinides indicator (Row 7, Col 3) */}
        <ButtonBase
          onClick={() => onSelectCategory("actinide")}
          sx={{
            gridColumn: 3,
            gridRow: 7,
            height: { xs: 68, sm: 76, md: 82 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            borderRadius: "8px",
            background: CATEGORY_MAP.actinide.bgGradient,
            border: `1px dashed ${CATEGORY_MAP.actinide.color}88`,
            borderTop: `3px solid ${CATEGORY_MAP.actinide.color}`,
            cursor: "pointer",
            transition: "all 0.18s ease",
            "&:hover": {
              borderColor: CATEGORY_MAP.actinide.borderHover,
              boxShadow: `0 0 12px ${CATEGORY_MAP.actinide.color}44`,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 800,
              color: CATEGORY_MAP.actinide.color,
            }}
          >
            89–103
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.62rem",
              color: "text.secondary",
              fontWeight: 600,
              mt: 0.5,
            }}
          >
            Ac–Lr
          </Typography>
        </ButtonBase>

        {/* Lanthanide Series Label Row 9, Col 1-2 */}
        <Box
          sx={{
            gridColumn: "1 / span 2",
            gridRow: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: CATEGORY_MAP.lanthanide.color,
              letterSpacing: "0.5px",
            }}
          >
            Lanthanides *
          </Typography>
        </Box>

        {/* Actinide Series Label Row 10, Col 1-2 */}
        <Box
          sx={{
            gridColumn: "1 / span 2",
            gridRow: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: CATEGORY_MAP.actinide.color,
              letterSpacing: "0.5px",
            }}
          >
            Actinides **
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
