import { PeriodicElement } from "../types/element";
import rawElements from "./elements.json";

export const elements: PeriodicElement[] = rawElements as PeriodicElement[];

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
