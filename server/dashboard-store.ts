import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type Product = {
  id: string;
  name: string;
  unit: string;
  standardCapacity: number;
  stretchCapacity: number;
  active: boolean;
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  orderDate: string;
  productionDate: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  amount: number;
  paymentStatus: "Pending" | "Paid" | "COD";
  status: "New" | "Confirmed" | "Preparing" | "Ready" | "Dispatched" | "Out for Delivery" | "Delivered" | "Cancelled" | "On Hold" | "Delivery Failed / Returned";
  deliveryPerson: string;
  trackingNumber: string;
  actualDeliveryDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardState = { products: Product[]; orders: Order[] };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve(__dirname, "..", "data");
const dataFile = path.join(dataDir, "dashboard.json");
const backupFile = path.join(dataDir, "dashboard.json.bak");

const emptyState: DashboardState = { products: [], orders: [] };

export async function readDashboard(): Promise<DashboardState> {
  try {
    return JSON.parse(await fs.readFile(dataFile, "utf8")) as DashboardState;
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(emptyState, null, 2));
    return emptyState;
  }
}

export async function writeDashboard(state: DashboardState) {
  await fs.mkdir(dataDir, { recursive: true });

  // Keep the last known-good dashboard state before replacing the live file.
  // The backup is best-effort so a backup failure never blocks a valid write.
  try {
    await fs.copyFile(dataFile, backupFile);
  } catch {
    // No existing dashboard file yet, or backup could not be created.
  }

  const temp = `${dataFile}.tmp`;
  await fs.writeFile(temp, JSON.stringify(state, null, 2));
  await fs.rename(temp, dataFile);
}
