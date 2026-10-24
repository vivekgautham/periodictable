import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { normalizeCategory } from "../data/categories";
import {
  elements,
  getElementByNumber,
  getElementBySymbol,
} from "../data/elements";
import { CategoryKey, PeriodicElement } from "../types/element";
import { Header } from "./Header";
import { PeriodicGrid } from "./PeriodicGrid";
import { TableControls } from "./TableControls";

export const PeriodicTablePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">(
    "all",
  );

  // Determine selected element from URL param
  const selectedElement = useMemo<PeriodicElement | null>(() => {
    if (!id) return null;
    const num = parseInt(id, 10);
    if (!isNaN(num) && num >= 1 && num <= 118) {
      return getElementByNumber(num) || null;
    }
    return getElementBySymbol(id) || null;
  }, [id]);

  const handleSelectElement = (element: PeriodicElement) => {
    navigate(`/element/${element.number}`);
  };

  const handleSelectElementByNumber = (num: number) => {
    navigate(`/element/${num}`);
  };

  const handleCloseModal = () => {
    navigate("/");
  };

  const handleRandomElement = () => {
    const randomNum = Math.floor(Math.random() * 118) + 1;
    navigate(`/element/${randomNum}`);
  };

  // Calculate matched elements count for search & category filters
  const matchedCount = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return elements.filter((el) => {
      const matchCat =
        activeCategory === "all" ||
        normalizeCategory(el.category) === activeCategory;
      if (!matchCat) return false;

      if (!query) return true;
      return (
        el.name.toLowerCase().includes(query) ||
        el.symbol.toLowerCase() === query ||
        el.symbol.toLowerCase().startsWith(query) ||
        el.number.toString() === query
      );
    }).length;
  }, [searchQuery, activeCategory]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0b0f19",
        backgroundImage:
          "radial-gradient(at 10% 10%, rgba(99, 102, 241, 0.08) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(56, 189, 248, 0.06) 0px, transparent 50%)",
        color: "text.primary",
        pb: 8,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Header onRandomElement={handleRandomElement} />

        <TableControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          totalElements={elements.length}
          matchedCount={matchedCount}
        />
      </Container>

      {/* Full-viewport width container so scroll bar goes all the way edge-to-edge */}
      <Box sx={{ width: "100%" }}>
        <PeriodicGrid
          elements={elements}
          selectedElement={selectedElement}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSelectElement={handleSelectElement}
          onSelectCategory={(cat) =>
            setActiveCategory((prev) => (prev === cat ? "all" : cat))
          }
          onCloseDetail={handleCloseModal}
          onSelectElementByNumber={handleSelectElementByNumber}
        />
      </Box>
    </Box>
  );
};
