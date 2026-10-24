import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ScienceIcon from "@mui/icons-material/Science";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { getCategoryInfo } from "../data/categories";
import { PeriodicElement } from "../types/element";

interface ElementInPlaceDetailProps {
  element: PeriodicElement;
  onClose: () => void;
  onSelectElement: (number: number) => void;
}

function kelvinToCelsius(k: number | null): string {
  if (k === null || k === undefined) return "N/A";
  const c = k - 273.15;
  return `${k} K (${c.toFixed(1)} °C)`;
}

export const ElementInPlaceDetail: React.FC<ElementInPlaceDetailProps> = ({
  element,
  onClose,
  onSelectElement,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const categoryInfo = getCategoryInfo(element.category);

  const prevNumber = element.number > 1 ? element.number - 1 : null;
  const nextNumber = element.number < 118 ? element.number + 1 : null;

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: 560, md: 620 },
        maxHeight: 740,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        backgroundColor: "rgba(17, 24, 39, 0.96)",
        backgroundImage: `radial-gradient(ellipse at top right, ${categoryInfo.color}22, transparent 65%), radial-gradient(ellipse at bottom left, #1e293b33, transparent 65%)`,
        backdropFilter: "blur(16px)",
        border: `1.5px solid ${categoryInfo.color}66`,
        boxShadow: `0 16px 48px rgba(0, 0, 0, 0.6), 0 0 32px ${categoryInfo.color}25`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top Navigation Bar: Prev / Next, Title & Close */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.25,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={
              prevNumber ? `Previous element (#${prevNumber})` : "First element"
            }
          >
            <span>
              <IconButton
                size="small"
                disabled={!prevNumber}
                onClick={() => prevNumber && onSelectElement(prevNumber)}
                sx={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  "&:hover": { borderColor: categoryInfo.color },
                }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip
            title={
              nextNumber ? `Next element (#${nextNumber})` : "Last element"
            }
          >
            <span>
              <IconButton
                size="small"
                disabled={!nextNumber}
                onClick={() => nextNumber && onSelectElement(nextNumber)}
                sx={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  "&:hover": { borderColor: categoryInfo.color },
                }}
              >
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 0.5, fontWeight: 600 }}
          >
            #{element.number} / 118
          </Typography>
        </Box>

        <Tooltip title="Close details (Esc)">
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Element Identity Banner */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Chemical Symbol Badge */}
        <Box
          sx={{
            width: 78,
            height: 84,
            flexShrink: 0,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${categoryInfo.color}33 0%, ${categoryInfo.color}15 100%)`,
            border: `2px solid ${categoryInfo.color}`,
            boxShadow: `0 0 16px ${categoryInfo.color}44`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 1,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              lineHeight: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "text.secondary",
              }}
            >
              {element.number}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.62rem",
                fontWeight: 700,
                color: categoryInfo.color,
                textTransform: "uppercase",
              }}
            >
              {element.block}-blk
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            {element.symbol}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{
              fontSize: "0.6rem",
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            {typeof element.atomic_mass === "number"
              ? element.atomic_mass.toFixed(2)
              : element.atomic_mass}
          </Typography>
        </Box>

        {/* Name, Category & Badges */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={800}
            noWrap
            sx={{ color: "#ffffff", letterSpacing: "-0.5px", lineHeight: 1.2 }}
          >
            {element.name}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
            <Chip
              label={categoryInfo.label}
              size="small"
              sx={{
                backgroundColor: `${categoryInfo.color}25`,
                color: categoryInfo.color,
                border: `1px solid ${categoryInfo.color}66`,
                fontWeight: 600,
                fontSize: "0.72rem",
                height: 22,
              }}
            />
            <Chip
              label={element.phase}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "text.secondary",
                fontSize: "0.72rem",
                height: 22,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        variant="fullWidth"
        sx={{
          minHeight: 38,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          "& .MuiTab-root": {
            minHeight: 38,
            py: 0.75,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "none",
            color: "text.secondary",
            "&.Mui-selected": {
              color: categoryInfo.color,
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: categoryInfo.color,
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Properties" />
        <Tab label="History & Media" />
      </Tabs>

      {/* Scrollable Tab Content Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.16)",
            borderRadius: 3,
          },
        }}
      >
        {/* Tab 0: Overview */}
        {activeTab === 0 && (
          <>
            {/* Quick Summary */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                color="primary.light"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  mb: 0.75,
                }}
              >
                <ScienceIcon fontSize="inherit" /> Summary
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.82rem",
                  lineHeight: 1.6,
                }}
              >
                {element.summary}
              </Typography>
            </Box>

            {/* Atomic & Orbital Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Electron Configuration
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ fontFamily: "monospace", color: categoryInfo.color }}
                >
                  {element.electron_configuration_semantic ||
                    element.electron_configuration}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Standard Atomic Mass
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {element.atomic_mass} u
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Period / Group
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  Period {element.period}, Group {element.group ?? "—"}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Electronegativity
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {element.electronegativity_pauling !== null
                    ? element.electronegativity_pauling
                    : "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* Electrons Per Shell */}
            <Box
              sx={{
                p: 1.25,
                borderRadius: 1.5,
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 0.75 }}
              >
                Electrons per Shell
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {element.shells.map((count, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      px: 0.8,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "text.primary",
                    }}
                  >
                    {count}
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}

        {/* Tab 1: Physical & Thermal Properties */}
        {activeTab === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Melting Point
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {kelvinToCelsius(element.melt)}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Boiling Point
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {kelvinToCelsius(element.boil)}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Density
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {element.density !== null
                  ? `${element.density} ${element.density_unit || "g/cm³"}`
                  : "N/A"}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Molar Heat Capacity
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {element.molar_heat !== null
                  ? `${element.molar_heat} J/(mol·K)`
                  : "N/A"}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                1st Ionization Energy
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {element.ionization_energies &&
                element.ionization_energies.length > 0
                  ? `${element.ionization_energies[0]} kJ/mol`
                  : "N/A"}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {element.appearance && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Appearance
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  noWrap
                  sx={{ maxWidth: 260 }}
                >
                  {element.appearance}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Tab 2: History & Media */}
        {activeTab === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" color="text.secondary">
                  Discovered By
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {element.discovered_by || "Ancient / Unknown"}
                </Typography>
              </Box>
              {element.named_by && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="caption" color="text.secondary">
                    Named By
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {element.named_by}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Specimen Image */}
            {element.image && element.image.url && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box
                  component="img"
                  src={element.image.url}
                  alt={element.image.title || element.name}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Box sx={{ p: 1.25 }}>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    display="block"
                    noWrap
                  >
                    {element.image.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.68rem",
                    }}
                  >
                    {element.image.attribution}
                  </Typography>
                </Box>
              </Box>
            )}

            <Button
              href={element.source}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon fontSize="small" />}
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                color: categoryInfo.color,
                borderColor: `${categoryInfo.color}66`,
                "&:hover": {
                  borderColor: categoryInfo.color,
                  backgroundColor: `${categoryInfo.color}15`,
                },
              }}
            >
              Read full Wikipedia Article
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
