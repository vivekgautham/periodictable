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
  onSelectCategory: (category: CategoryKey | "all") => void;
}

export const PeriodicGrid: React.FC<PeriodicGridProps> = ({
  elements,
  selectedElement,
  activeCategory,
  searchQuery,
  onSelectElement,
  onSelectCategory,
}) => {
  const isLanthanideActive = activeCategory === "lanthanide";
  const isActinideActive = activeCategory === "actinide";
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
          gridTemplateRows: "26px repeat(7, auto) 28px repeat(2, auto)",
          columnGap: { xs: "8px", sm: "10px", md: "12px" },
          rowGap: { xs: "8px", sm: "10px", md: "12px" },
          minWidth: 1340,
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

        {/* Placeholder: Lanthanides indicator (Row 7, Col 3 - Period 6) */}
        <ButtonBase
          onClick={() =>
            onSelectCategory(isLanthanideActive ? "all" : "lanthanide")
          }
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
            background: isLanthanideActive
              ? `linear-gradient(135deg, ${CATEGORY_MAP.lanthanide.color}55 0%, ${CATEGORY_MAP.lanthanide.color}25 100%)`
              : CATEGORY_MAP.lanthanide.bgGradient,
            border: isLanthanideActive
              ? `1.5px solid ${CATEGORY_MAP.lanthanide.color}`
              : `1px dashed ${CATEGORY_MAP.lanthanide.color}88`,
            borderTop: `3px solid ${CATEGORY_MAP.lanthanide.color}`,
            cursor: "pointer",
            transition: "all 0.18s ease",
            boxShadow: isLanthanideActive
              ? `0 0 16px ${CATEGORY_MAP.lanthanide.color}66`
              : "none",
            "&:hover": {
              borderColor: CATEGORY_MAP.lanthanide.borderHover,
              boxShadow: `0 0 14px ${CATEGORY_MAP.lanthanide.color}55`,
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

        {/* Placeholder: Actinides indicator (Row 8, Col 3 - Period 7) */}
        <ButtonBase
          onClick={() =>
            onSelectCategory(isActinideActive ? "all" : "actinide")
          }
          sx={{
            gridColumn: 3,
            gridRow: 8,
            height: { xs: 68, sm: 76, md: 82 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            borderRadius: "8px",
            background: isActinideActive
              ? `linear-gradient(135deg, ${CATEGORY_MAP.actinide.color}55 0%, ${CATEGORY_MAP.actinide.color}25 100%)`
              : CATEGORY_MAP.actinide.bgGradient,
            border: isActinideActive
              ? `1.5px solid ${CATEGORY_MAP.actinide.color}`
              : `1px dashed ${CATEGORY_MAP.actinide.color}88`,
            borderTop: `3px solid ${CATEGORY_MAP.actinide.color}`,
            cursor: "pointer",
            transition: "all 0.18s ease",
            boxShadow: isActinideActive
              ? `0 0 16px ${CATEGORY_MAP.actinide.color}66`
              : "none",
            "&:hover": {
              borderColor: CATEGORY_MAP.actinide.borderHover,
              boxShadow: `0 0 14px ${CATEGORY_MAP.actinide.color}55`,
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

        {/* Spacer / subtle divider row between main table and f-block */}
        <Box
          sx={{
            gridColumn: "1 / span 18",
            gridRow: 9,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 10%, rgba(255, 255, 255, 0.08) 90%, transparent 100%)",
            }}
          />
        </Box>

        {/* Lanthanide Series Label Row 10, Col 1-2 */}
        <ButtonBase
          onClick={() =>
            onSelectCategory(isLanthanideActive ? "all" : "lanthanide")
          }
          sx={{
            gridColumn: "1 / span 2",
            gridRow: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 1.5,
            borderRadius: 1.5,
            transition: "all 0.15s ease",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: CATEGORY_MAP.lanthanide.color,
              letterSpacing: "0.5px",
              textDecoration: isLanthanideActive ? "underline" : "none",
            }}
          >
            Lanthanides *
          </Typography>
        </ButtonBase>

        {/* Actinide Series Label Row 11, Col 1-2 */}
        <ButtonBase
          onClick={() =>
            onSelectCategory(isActinideActive ? "all" : "actinide")
          }
          sx={{
            gridColumn: "1 / span 2",
            gridRow: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 1.5,
            borderRadius: 1.5,
            transition: "all 0.15s ease",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: CATEGORY_MAP.actinide.color,
              letterSpacing: "0.5px",
              textDecoration: isActinideActive ? "underline" : "none",
            }}
          >
            Actinides **
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
};
