import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useRef } from "react";
import { CATEGORY_MAP, normalizeCategory } from "../data/categories";
import { CategoryKey, PeriodicElement } from "../types/element";
import { ElementInPlaceDetail } from "./ElementInPlaceDetail";
import { ElementTile } from "./ElementTile";

interface PeriodicGridProps {
  elements: PeriodicElement[];
  selectedElement: PeriodicElement | null;
  activeCategory: CategoryKey | "all";
  searchQuery: string;
  onSelectElement: (element: PeriodicElement) => void;
  onSelectCategory: (category: CategoryKey | "all") => void;
  onCloseDetail: () => void;
  onSelectElementByNumber: (num: number) => void;
}

export const PeriodicGrid: React.FC<PeriodicGridProps> = ({
  elements,
  selectedElement,
  activeCategory,
  searchQuery,
  onSelectElement,
  onSelectCategory,
  onCloseDetail,
  onSelectElementByNumber,
}) => {
  const centerStageRef = useRef<HTMLDivElement>(null);
  const isCompressed = Boolean(selectedElement);
  const isLanthanideActive = activeCategory === "lanthanide";
  const isActinideActive = activeCategory === "actinide";
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Split elements into Left Wing (columns 1-9) and Right Wing (columns 10-18)
  const leftElements = useMemo(
    () => elements.filter((e) => e.xpos <= 9),
    [elements],
  );
  const rightElements = useMemo(
    () => elements.filter((e) => e.xpos >= 10),
    [elements],
  );

  // Smooth scroll center stage into view when an element is opened
  useEffect(() => {
    if (selectedElement && centerStageRef.current) {
      centerStageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedElement]);

  // Keyboard navigation when detail is open: Left/Right arrows & Escape to close
  useEffect(() => {
    if (!selectedElement) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseDetail();
      } else if (e.key === "ArrowLeft") {
        if (selectedElement.number > 1) {
          onSelectElementByNumber(selectedElement.number - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (selectedElement.number < 118) {
          onSelectElementByNumber(selectedElement.number + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedElement, onCloseDetail, onSelectElementByNumber]);

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

  const handleTileClick = (element: PeriodicElement) => {
    if (selectedElement?.number === element.number) {
      onCloseDetail();
    } else {
      onSelectElement(element);
    }
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
          display: "flex",
          width: isCompressed ? "100%" : "max-content",
          minWidth: "100%",
          boxSizing: "border-box",
          px: isCompressed
            ? { xs: 1, sm: 2, md: 2.5 }
            : { xs: 2, sm: 3, md: 4 },
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: isCompressed ? "100%" : "auto",
            maxWidth: isCompressed ? 1260 : "none",
            margin: "0 auto",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ================= LEFT WING: GROUPS 1 TO 9 ================= */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isCompressed
                ? "repeat(9, minmax(28px, 1fr))"
                : "repeat(9, minmax(56px, 1fr))",
              gridTemplateRows: isCompressed
                ? "18px repeat(7, auto) 18px repeat(2, auto)"
                : "24px repeat(7, auto) 24px repeat(2, auto)",
              columnGap: isCompressed
                ? { xs: "3px", sm: "4px", md: "5px" }
                : { xs: "6px", sm: "8px", md: "9px" },
              rowGap: isCompressed
                ? { xs: "3px", sm: "4px", md: "5px" }
                : { xs: "6px", sm: "8px", md: "9px" },
              flex: isCompressed ? "0 1 auto" : "1 0 auto",
              maxWidth: isCompressed
                ? { xs: 290, sm: 340, md: 380 }
                : { xs: 580, md: 640, lg: 680 },
              mr: isCompressed ? 0 : { xs: "8px", sm: "10px", md: "12px" },
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Group Numbers 1 to 9 */}
            {Array.from({ length: 9 }, (_, i) => i + 1).map((groupNum) => (
              <Box
                key={`left-group-${groupNum}`}
                sx={{
                  gridColumn: groupNum,
                  gridRow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: isCompressed ? 0 : 0.25,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: isCompressed ? "0.58rem" : "0.72rem",
                    fontWeight: 700,
                    color: "text.secondary",
                    opacity: 0.7,
                  }}
                >
                  {groupNum}
                </Typography>
              </Box>
            ))}

            {/* Left Wing Elements (xpos 1 to 9) */}
            {leftElements.map((element) => {
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
                  gridColumn={element.xpos}
                  gridRow={element.ypos + 1}
                  isSelected={isSelected}
                  isDimmed={isDimmed}
                  isMatch={isHighlighted}
                  isCompressed={isCompressed}
                  onClick={handleTileClick}
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
                height: isCompressed
                  ? { xs: 38, sm: 44, md: 48 }
                  : { xs: 58, sm: 64, md: 70 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: isCompressed ? "1px 2px" : "3px 4px",
                borderRadius: "6px",
                background: isLanthanideActive
                  ? `linear-gradient(135deg, ${CATEGORY_MAP.lanthanide.color}55 0%, ${CATEGORY_MAP.lanthanide.color}25 100%)`
                  : CATEGORY_MAP.lanthanide.bgGradient,
                border: isLanthanideActive
                  ? `1.5px solid ${CATEGORY_MAP.lanthanide.color}`
                  : `1px dashed ${CATEGORY_MAP.lanthanide.color}88`,
                borderTop: `${isCompressed ? "2px" : "2.5px"} solid ${CATEGORY_MAP.lanthanide.color}`,
                cursor: "pointer",
                transition: "all 0.16s ease",
                boxShadow: isLanthanideActive
                  ? `0 0 14px ${CATEGORY_MAP.lanthanide.color}55`
                  : "none",
                "&:hover": {
                  borderColor: CATEGORY_MAP.lanthanide.borderHover,
                  boxShadow: `0 0 12px ${CATEGORY_MAP.lanthanide.color}45`,
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: isCompressed ? "0.62rem" : "0.72rem",
                  fontWeight: 800,
                  color: CATEGORY_MAP.lanthanide.color,
                }}
              >
                57–71
              </Typography>
              {!isCompressed && (
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.58rem",
                    color: "text.secondary",
                    fontWeight: 600,
                    mt: 0.25,
                  }}
                >
                  La–Lu
                </Typography>
              )}
            </ButtonBase>

            {/* Placeholder: Actinides indicator (Row 8, Col 3 - Period 7) */}
            <ButtonBase
              onClick={() =>
                onSelectCategory(isActinideActive ? "all" : "actinide")
              }
              sx={{
                gridColumn: 3,
                gridRow: 8,
                height: isCompressed
                  ? { xs: 38, sm: 44, md: 48 }
                  : { xs: 58, sm: 64, md: 70 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: isCompressed ? "1px 2px" : "3px 4px",
                borderRadius: "6px",
                background: isActinideActive
                  ? `linear-gradient(135deg, ${CATEGORY_MAP.actinide.color}55 0%, ${CATEGORY_MAP.actinide.color}25 100%)`
                  : CATEGORY_MAP.actinide.bgGradient,
                border: isActinideActive
                  ? `1.5px solid ${CATEGORY_MAP.actinide.color}`
                  : `1px dashed ${CATEGORY_MAP.actinide.color}88`,
                borderTop: `${isCompressed ? "2px" : "2.5px"} solid ${CATEGORY_MAP.actinide.color}`,
                cursor: "pointer",
                transition: "all 0.16s ease",
                boxShadow: isActinideActive
                  ? `0 0 14px ${CATEGORY_MAP.actinide.color}55`
                  : "none",
                "&:hover": {
                  borderColor: CATEGORY_MAP.actinide.borderHover,
                  boxShadow: `0 0 12px ${CATEGORY_MAP.actinide.color}45`,
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: isCompressed ? "0.62rem" : "0.72rem",
                  fontWeight: 800,
                  color: CATEGORY_MAP.actinide.color,
                }}
              >
                89–103
              </Typography>
              {!isCompressed && (
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.58rem",
                    color: "text.secondary",
                    fontWeight: 600,
                    mt: 0.25,
                  }}
                >
                  Ac–Lr
                </Typography>
              )}
            </ButtonBase>

            {/* Left Wing Spacer Divider Row 9 */}
            <Box
              sx={{
                gridColumn: "1 / span 9",
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
                    "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 15%, rgba(255, 255, 255, 0.08) 100%)",
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
                pr: isCompressed ? 0.75 : 1.5,
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
                  fontSize: isCompressed ? "0.62rem" : "0.75rem",
                  fontWeight: 700,
                  color: CATEGORY_MAP.lanthanide.color,
                  letterSpacing: "0.5px",
                  textDecoration: isLanthanideActive ? "underline" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {isCompressed ? "* 57–71" : "Lanthanides *"}
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
                pr: isCompressed ? 0.75 : 1.5,
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
                  fontSize: isCompressed ? "0.62rem" : "0.75rem",
                  fontWeight: 700,
                  color: CATEGORY_MAP.actinide.color,
                  letterSpacing: "0.5px",
                  textDecoration: isActinideActive ? "underline" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {isCompressed ? "** 89–103" : "Actinides **"}
              </Typography>
            </ButtonBase>
          </Box>

          {/* ================= CENTER STAGE: IN-PLACE ELEMENT DETAILS ================= */}
          <Box
            ref={centerStageRef}
            sx={{
              width: selectedElement ? { xs: "100%", md: 410, lg: 450 } : 0,
              minWidth: selectedElement ? { xs: 280, md: 380, lg: 410 } : 0,
              maxWidth: { xs: "100%", md: 430, lg: 460 },
              opacity: selectedElement ? 1 : 0,
              transform: selectedElement ? "scale(1)" : "scale(0.92)",
              transition:
                "width 0.35s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), margin 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              mx: selectedElement ? { xs: 0.75, sm: 1.25, md: 1.5 } : 0,
              overflow: "hidden",
              pointerEvents: selectedElement ? "auto" : "none",
              alignSelf: "stretch",
            }}
          >
            {selectedElement && (
              <ElementInPlaceDetail
                element={selectedElement}
                onClose={onCloseDetail}
                onSelectElement={onSelectElementByNumber}
              />
            )}
          </Box>

          {/* ================= RIGHT WING: GROUPS 10 TO 18 ================= */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isCompressed
                ? "repeat(9, minmax(28px, 1fr))"
                : "repeat(9, minmax(56px, 1fr))",
              gridTemplateRows: isCompressed
                ? "18px repeat(7, auto) 18px repeat(2, auto)"
                : "24px repeat(7, auto) 24px repeat(2, auto)",
              columnGap: isCompressed
                ? { xs: "3px", sm: "4px", md: "5px" }
                : { xs: "6px", sm: "8px", md: "9px" },
              rowGap: isCompressed
                ? { xs: "3px", sm: "4px", md: "5px" }
                : { xs: "6px", sm: "8px", md: "9px" },
              flex: isCompressed ? "0 1 auto" : "1 0 auto",
              maxWidth: isCompressed
                ? { xs: 290, sm: 340, md: 380 }
                : { xs: 580, md: 640, lg: 680 },
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Group Numbers 10 to 18 */}
            {Array.from({ length: 9 }, (_, i) => i + 10).map((groupNum) => (
              <Box
                key={`right-group-${groupNum}`}
                sx={{
                  gridColumn: groupNum - 9,
                  gridRow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: isCompressed ? 0 : 0.25,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: isCompressed ? "0.58rem" : "0.72rem",
                    fontWeight: 700,
                    color: "text.secondary",
                    opacity: 0.7,
                  }}
                >
                  {groupNum}
                </Typography>
              </Box>
            ))}

            {/* Right Wing Elements (xpos 10 to 18, mapped to gridColumn 1 to 9) */}
            {rightElements.map((element) => {
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
                  gridColumn={element.xpos - 9}
                  gridRow={element.ypos + 1}
                  isSelected={isSelected}
                  isDimmed={isDimmed}
                  isMatch={isHighlighted}
                  isCompressed={isCompressed}
                  onClick={handleTileClick}
                />
              );
            })}

            {/* Right Wing Spacer Divider Row 9 */}
            <Box
              sx={{
                gridColumn: "1 / span 9",
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
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 85%, transparent 100%)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
