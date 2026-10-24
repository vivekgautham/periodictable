import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ScienceIcon from "@mui/icons-material/Science";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { getCategoryInfo } from "../data/categories";
import { PeriodicElement } from "../types/element";

interface ElementDetailModalProps {
  element: PeriodicElement | null;
  open: boolean;
  onClose: () => void;
  onSelectElement: (elementNumber: number) => void;
}

function kelvinToCelsius(k: number | null): string {
  if (k === null || k === undefined) return "N/A";
  const c = k - 273.15;
  return `${k} K (${c.toFixed(1)} °C)`;
}

export const ElementDetailModal: React.FC<ElementDetailModalProps> = ({
  element,
  open,
  onClose,
  onSelectElement,
}) => {
  // Keyboard navigation: left/right arrow to switch elements, escape to close
  useEffect(() => {
    if (!open || !element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (element.number > 1) {
          onSelectElement(element.number - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (element.number < 118) {
          onSelectElement(element.number + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, element, onSelectElement]);

  if (!element) return null;

  const categoryInfo = getCategoryInfo(element.category);
  const prevNumber = element.number > 1 ? element.number - 1 : null;
  const nextNumber = element.number < 118 ? element.number + 1 : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          backgroundColor: "#111827",
          backgroundImage: `radial-gradient(ellipse at top right, ${categoryInfo.color}18, transparent 65%), radial-gradient(ellipse at bottom left, #1e293b22, transparent 65%)`,
          borderRadius: 3,
          border: `1px solid ${categoryInfo.color}44`,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px ${categoryInfo.color}22`,
          overflow: "hidden",
        },
      }}
    >
      {/* Top action bar: Prev / Next & Close */}
      <DialogTitle
        sx={{
          m: 0,
          p: { xs: 2, sm: 2.5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={prevNumber ? `Previous: #${prevNumber}` : "First element"}
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

          <Tooltip title={nextNumber ? `Next: #${nextNumber}` : "Last element"}>
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

          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            Element {element.number} of 118
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        {/* Main Element Header Banner */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 3,
            mb: 3.5,
          }}
        >
          {/* Big Chemical Symbol Badge */}
          <Paper
            elevation={4}
            sx={{
              width: { xs: 90, sm: 110 },
              height: { xs: 100, sm: 120 },
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 1.5,
              borderRadius: 2.5,
              background: `linear-gradient(145deg, ${categoryInfo.color}33 0%, ${categoryInfo.color}15 100%)`,
              border: `2px solid ${categoryInfo.color}`,
              boxShadow: `0 0 25px ${categoryInfo.color}33`,
              textAlign: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
              >
                {element.number}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ color: categoryInfo.color, textTransform: "uppercase" }}
              >
                {element.block}-block
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-1px",
                lineHeight: 1,
              }}
            >
              {element.symbol}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ fontSize: "0.7rem", fontWeight: 600 }}
            >
              {typeof element.atomic_mass === "number"
                ? element.atomic_mass.toFixed(3)
                : element.atomic_mass}
            </Typography>
          </Paper>

          {/* Name & Chips */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" },
                gap: 1.5,
                mb: 1,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight={800}
                sx={{ color: "#ffffff", letterSpacing: "-0.5px" }}
              >
                {element.name}
              </Typography>
              <Chip
                label={categoryInfo.label}
                size="small"
                sx={{
                  backgroundColor: `${categoryInfo.color}25`,
                  color: categoryInfo.color,
                  border: `1px solid ${categoryInfo.color}66`,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label={`Phase: ${element.phase}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "text.secondary",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              />
            </Box>

            {element.appearance && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5, fontStyle: "italic" }}
              >
                Appearance: {element.appearance}
              </Typography>
            )}

            {/* Quick Stats Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(4, 1fr)",
                },
                gap: 1.5,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Period
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {element.period}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Group
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {element.group ?? "—"}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Block
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase" }}
                >
                  {element.block}-block
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Electronegativity
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {element.electronegativity_pauling ?? "N/A"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />

        {/* Summary Description */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            color="primary.light"
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <ScienceIcon fontSize="small" /> Overview & Description
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              backgroundColor: "rgba(255,255,255,0.02)",
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {element.summary}
          </Typography>
        </Box>

        {/* Detailed Properties Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
            mb: 3,
          }}
        >
          {/* Atomic Properties */}
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 2,
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ mb: 2, color: "#f8fafc" }}
            >
              Atomic & Orbital Structure
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Electron Configuration
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ fontFamily: "monospace", color: categoryInfo.color }}
                >
                  {element.electron_configuration_semantic ||
                    element.electron_configuration}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Electrons per Shell
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {element.shells.map((count, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        px: 0.8,
                        py: 0.2,
                        borderRadius: 1,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        color: "text.primary",
                      }}
                    >
                      {count}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Standard Atomic Weight
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {element.atomic_mass} u
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Electron Affinity
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {element.electron_affinity !== null
                    ? `${element.electron_affinity} kJ/mol`
                    : "N/A"}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

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
            </Box>
          </Paper>

          {/* Physical & Thermal Properties */}
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 2,
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ mb: 2, color: "#f8fafc" }}
            >
              Physical & Thermal Properties
            </Typography>

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

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

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

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

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

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

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

              <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Discovered By
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  noWrap
                  sx={{ maxWidth: 220 }}
                >
                  {element.discovered_by || "Ancient / Unknown"}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Media & Image (if present) */}
        {element.image && element.image.url && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2.5,
              mb: 2.5,
            }}
          >
            <Box
              component="img"
              src={element.image.url}
              alt={element.image.title || element.name}
              sx={{
                width: { xs: "100%", sm: 160 },
                height: 120,
                objectFit: "cover",
                borderRadius: 1.5,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="primary.light"
                fontWeight={600}
              >
                Specimen Image
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mt: 0.5, mb: 0.5 }}
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
                }}
              >
                {element.image.attribution}
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Footer actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pt: 1,
          }}
        >
          {element.named_by && (
            <Typography variant="caption" color="text.secondary">
              Named by: <strong>{element.named_by}</strong>
            </Typography>
          )}

          <Button
            href={element.source}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon fontSize="small" />}
            size="small"
            sx={{
              ml: "auto",
              color: categoryInfo.color,
              borderColor: `${categoryInfo.color}66`,
              "&:hover": {
                borderColor: categoryInfo.color,
                backgroundColor: `${categoryInfo.color}15`,
              },
            }}
            variant="outlined"
          >
            Wikipedia Article
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
