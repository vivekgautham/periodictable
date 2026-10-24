import { Isotope, PeriodicElement } from "../types/element";
import rawElements from "./elements.json";
import rawIsotopes from "./isotopes.json";

export const elements: PeriodicElement[] = rawElements as PeriodicElement[];

export const isotopesMap: Record<string, Isotope[]> =
  rawIsotopes as Record<string, Isotope[]>;

export function getElementIsotopes(atomicNumber: number): Isotope[] {
  return isotopesMap[atomicNumber.toString()] || [];
}

export const elementMap = new Map<number, PeriodicElement>(
  elements.map((el) => [el.number, el]),
);

export const elementSymbolMap = new Map<string, PeriodicElement>(
  elements.map((el) => [el.symbol.toLowerCase(), el]),
);

export function getElementByNumber(
  number: number,
): PeriodicElement | undefined {
  return elementMap.get(number);
}

export function getElementBySymbol(
  symbol: string,
): PeriodicElement | undefined {
  return elementSymbolMap.get(symbol.toLowerCase());
}
