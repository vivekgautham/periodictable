import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { CATEGORIES_LIST } from "../data/categories";
import { CategoryKey } from "../types/element";

interface TableControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: CategoryKey | "all";
  onCategoryChange: (category: CategoryKey | "all") => void;
  totalElements: number;
  matchedCount: number;
}

export const TableControls: React.FC<TableControlsProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  totalElements,
  matchedCount,
}) => {
  const isFiltered = Boolean(searchQuery) || activeCategory !== "all";

  const handleClear = () => {
    onSearchChange("");
    onCategoryChange("all");
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Search Bar & Result Stats */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, symbol, or number (e.g. Gold, Au, 79)..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            maxWidth: { sm: 440 },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              borderRadius: 2,
              borderColor: "rgba(255, 255, 255, 0.12)",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.light",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                boxShadow: "0 0 12px rgba(99, 102, 241, 0.25)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="clear search"
                  onClick={() => onSearchChange("")}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            {isFiltered ? (
              <>
                Showing <strong>{matchedCount}</strong> of {totalElements}{" "}
                elements
              </>
            ) : (
              <>
                All <strong>{totalElements}</strong> elements
              </>
            )}
          </Typography>

          {isFiltered && (
            <Button
              size="small"
              onClick={handleClear}
              variant="text"
              sx={{
                color: "primary.light",
                textTransform: "none",
                fontSize: "0.8rem",
                p: "2px 6px",
              }}
            >
              Reset
            </Button>
          )}
        </Box>
      </Box>

      {/* Category Filter Chips / Legend */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Chip
          label="All Categories"
          size="small"
          clickable
          onClick={() => onCategoryChange("all")}
          variant={activeCategory === "all" ? "filled" : "outlined"}
          sx={{
            fontWeight: 600,
            fontSize: "0.76rem",
            backgroundColor:
              activeCategory === "all" ? "primary.main" : "transparent",
            color: activeCategory === "all" ? "#fff" : "text.secondary",
            borderColor: "rgba(255, 255, 255, 0.16)",
            "&:hover": {
              backgroundColor:
                activeCategory === "all"
                  ? "primary.dark"
                  : "rgba(255,255,255,0.06)",
            },
          }}
        />

        {CATEGORIES_LIST.map((cat) => {
          const isSelected = activeCategory === cat.key;
          return (
            <Chip
              key={cat.key}
              label={cat.label}
              size="small"
              clickable
              onClick={() => onCategoryChange(isSelected ? "all" : cat.key)}
              variant={isSelected ? "filled" : "outlined"}
              icon={
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    backgroundColor: cat.color,
                    ml: "6px !important",
                    boxShadow: isSelected ? `0 0 6px ${cat.color}` : "none",
                  }}
                />
              }
              sx={{
                fontWeight: 600,
                fontSize: "0.76rem",
                backgroundColor: isSelected ? `${cat.color}33` : "transparent",
                color: isSelected ? cat.color : "text.secondary",
                borderColor: isSelected
                  ? cat.color
                  : "rgba(255, 255, 255, 0.12)",
                boxShadow: isSelected ? `0 0 10px ${cat.color}33` : "none",
                transition: "all 0.15s ease",
                "&:hover": {
                  borderColor: cat.color,
                  backgroundColor: `${cat.color}22`,
                  color: cat.color,
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};
