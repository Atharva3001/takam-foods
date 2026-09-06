export type ProductionSchedule = {
  date: string;
  products: Array<{
    name: string;
    range: string;
    unit: "pieces" | "kg";
    standardCapacity: number;
    maxCapacity: number;
  }>;
};

const days: Array<[string, string[]]> = [
  ["2026-09-14", ["Ukadicha Modak", "Dinka Modak", "Khava Modak", "Gulkand Modak"]],
  ["2026-09-15", ["Ukadicha Modak", "Paushtik Modak", "Khava Modak", "Beet Modak"]],
  ["2026-09-16", ["Ukadicha Modak", "Dryfruit Modak", "Nachani Modak", "Gulkand Modak"]],
  ["2026-09-17", ["Ukadicha Modak", "Tilkund Modak", "Dinka Modak", "Khava Modak"]],
  ["2026-09-18", ["Ukadicha Modak", "Nachani Modak", "Paushtik Modak", "Beet Modak"]],
  ["2026-09-19", ["Ukadicha Modak", "Dryfruit Modak", "Tilkund Modak", "Gulkand Modak"]],
  ["2026-09-20", ["Ukadicha Modak", "Dinka Modak", "Nachani Modak", "Khava Modak"]],
  ["2026-09-21", ["Ukadicha Modak", "Paushtik Modak", "Dryfruit Modak", "Beet Modak"]],
  ["2026-09-22", ["Ukadicha Modak", "Nachani Modak", "Tilkund Modak", "Gulkand Modak"]],
  ["2026-09-23", ["Ukadicha Modak", "Dinka Modak", "Paushtik Modak", "Khava Modak"]],
  ["2026-09-24", ["Ukadicha Modak", "Dryfruit Modak", "Nachani Modak", "Gulkand Modak"]],
];

function productSpec(name: string) {
  if (name === "Ukadicha Modak") return { range: "50–70 Pieces", unit: "pieces" as const, standardCapacity: 50, maxCapacity: 70 };
  return { range: "500gm–1KG", unit: "kg" as const, standardCapacity: 0.5, maxCapacity: 1 };
}

export const productionTimetable: ProductionSchedule[] = days.map(([date, names]) => ({
  date,
  products: names.map((name) => ({ name, ...productSpec(name) })),
}));

export function getProductionSchedule(date: string) {
  return productionTimetable.find((day) => day.date === date) || null;
}
