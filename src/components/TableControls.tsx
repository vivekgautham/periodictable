import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
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
    <Box sx={{ width: "100%", mb: 3 }}>
      {/* Full-viewport Search Bar */}
      <Box sx={{ width: "100%", mb: 2 }}>
        <TextField
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, symbol, or atomic number (e.g. Gold, Au, 79)..."
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(17, 24, 39, 0.85)",
              borderRadius: 2.5,
              fontSize: { xs: "0.9rem", sm: "0.95rem" },
              border: "1px solid rgba(255, 255, 255, 0.12)",
              transition: "all 0.2s ease",
              "& fieldset": {
                border: "none",
              },
              "&:hover": {
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                borderColor: "rgba(99, 102, 241, 0.5)",
                boxShadow: "0 0 16px rgba(99, 102, 241, 0.15)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(17, 24, 39, 1)",
                borderColor: "primary.main",
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 0.5, mr: 1.5 }}>
                <SearchIcon sx={{ color: "primary.light", fontSize: 22 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ gap: 1, pr: 0.5 }}>
                {isFiltered && (
                  <Chip
                    label={`${matchedCount} of ${totalElements} elements`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "text.secondary",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  />
                )}
                {searchQuery && (
                  <IconButton
                    size="small"
                    aria-label="clear search"
                    onClick={() => onSearchChange("")}
                    edge="end"
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Category Filter Chips / Legend & Reset Action */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
            flex: 1,
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
                  backgroundColor: isSelected
                    ? `${cat.color}33`
                    : "transparent",
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

        {isFiltered && (
          <Button
            size="small"
            onClick={handleClear}
            variant="text"
            sx={{
              color: "primary.light",
              textTransform: "none",
              fontSize: "0.8rem",
              p: "2px 8px",
              whiteSpace: "nowrap",
            }}
          >
            Reset Filters
          </Button>
        )}
      </Box>
    </Box>
  );
};
