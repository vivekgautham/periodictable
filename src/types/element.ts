export interface Isotope {
  massNumber: number;
  mass: number | null;
  abundance: number | null;
  isStable: boolean;
  halfLife: string;
  decayModes: string[];
}

export interface ElementImage {
  title: string;
  url: string;
  attribution: string;
}

export interface AtomicRadii {
  empirical?: number[] | null;
  calculated?: number[] | null;
  van_der_waals?: number[] | null;
  covalent_single?: number[] | null;
  covalent_triple?: number[] | null;
  metallic?: number[] | null;
}

export interface PeriodicElement {
  name: string;
  appearance: string | null;
  atomic_mass: number;
  boil: number | null;
  category: string;
  density: number | null;
  density_unit?: string | null;
  density_g_cm3?: number | null;
  discovered_by: string | null;
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  source: string;
  bohr_model_image: string | null;
  bohr_model_3d: string | null;
  spectral_img: string | null;
  summary: string;
  symbol: string;
  xpos: number;
  ypos: number;
  wxpos?: number;
  wypos?: number;
  shells: number[];
  electron_configuration: string;
  electron_configuration_semantic: string;
  electron_affinity: number | null;
  atomic_radii?: AtomicRadii | null;
  electronegativity_pauling: number | null;
  ionization_energies: number[];
  "cpk-hex": string | null;
  image?: ElementImage | null;
  block: string;
}

export type CategoryKey =
  | "alkali-metal"
  | "alkaline-earth-metal"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "reactive-nonmetal"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown";

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  color: string;
  bgGradient: string;
  borderHover: string;
}
