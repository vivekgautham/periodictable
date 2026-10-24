import { CategoryInfo, CategoryKey } from "../types/element";

export const CATEGORY_MAP: Record<CategoryKey, CategoryInfo> = {
  "alkali-metal": {
    key: "alkali-metal",
    label: "Alkali Metal",
    color: "#f97316",
    bgGradient:
      "linear-gradient(135deg, rgba(249, 115, 22, 0.22) 0%, rgba(249, 115, 22, 0.08) 100%)",
    borderHover: "#fb923c",
  },
  "alkaline-earth-metal": {
    key: "alkaline-earth-metal",
    label: "Alkaline Earth Metal",
    color: "#eab308",
    bgGradient:
      "linear-gradient(135deg, rgba(234, 179, 8, 0.22) 0%, rgba(234, 179, 8, 0.08) 100%)",
    borderHover: "#facc15",
  },
  "transition-metal": {
    key: "transition-metal",
    label: "Transition Metal",
    color: "#06b6d4",
    bgGradient:
      "linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(6, 182, 212, 0.08) 100%)",
    borderHover: "#22d3ee",
  },
  "post-transition-metal": {
    key: "post-transition-metal",
    label: "Post-Transition Metal",
    color: "#14b8a6",
    bgGradient:
      "linear-gradient(135deg, rgba(20, 184, 166, 0.22) 0%, rgba(20, 184, 166, 0.08) 100%)",
    borderHover: "#2dd4bf",
  },
  metalloid: {
    key: "metalloid",
    label: "Metalloid",
    color: "#10b981",
    bgGradient:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0.08) 100%)",
    borderHover: "#34d399",
  },
  "reactive-nonmetal": {
    key: "reactive-nonmetal",
    label: "Reactive Nonmetal",
    color: "#84cc16",
    bgGradient:
      "linear-gradient(135deg, rgba(132, 204, 22, 0.22) 0%, rgba(132, 204, 22, 0.08) 100%)",
    borderHover: "#a3e635",
  },
  "noble-gas": {
    key: "noble-gas",
    label: "Noble Gas",
    color: "#a855f7",
    bgGradient:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(168, 85, 247, 0.08) 100%)",
    borderHover: "#c084fc",
  },
  lanthanide: {
    key: "lanthanide",
    label: "Lanthanide",
    color: "#ec4899",
    bgGradient:
      "linear-gradient(135deg, rgba(236, 72, 153, 0.22) 0%, rgba(236, 72, 153, 0.08) 100%)",
    borderHover: "#f472b6",
  },
  actinide: {
    key: "actinide",
    label: "Actinide",
    color: "#d946ef",
    bgGradient:
      "linear-gradient(135deg, rgba(217, 70, 239, 0.22) 0%, rgba(217, 70, 239, 0.08) 100%)",
    borderHover: "#e879f9",
  },
  unknown: {
    key: "unknown",
    label: "Unknown / Synthetic",
    color: "#94a3b8",
    bgGradient:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(148, 163, 184, 0.07) 100%)",
    borderHover: "#cbd5e1",
  },
};

export const CATEGORIES_LIST = Object.values(CATEGORY_MAP);

export function normalizeCategory(category: string): CategoryKey {
  const cat = category.toLowerCase().trim();
  if (cat.includes("alkali metal") && !cat.includes("alkaline")) {
    return "alkali-metal";
  }
  if (cat.includes("alkaline earth")) {
    return "alkaline-earth-metal";
  }
  if (cat.includes("lanthanide")) {
    return "lanthanide";
  }
  if (cat.includes("actinide")) {
    return "actinide";
  }
  if (cat.includes("noble gas")) {
    return "noble-gas";
  }
  if (cat.includes("nonmetal")) {
    return "reactive-nonmetal";
  }
  if (cat.includes("metalloid")) {
    return "metalloid";
  }
  if (cat.includes("post-transition metal")) {
    return "post-transition-metal";
  }
  if (cat.includes("transition metal")) {
    return "transition-metal";
  }
  return "unknown";
}

export function getCategoryInfo(category: string): CategoryInfo {
  const key = normalizeCategory(category);
  return CATEGORY_MAP[key];
}
