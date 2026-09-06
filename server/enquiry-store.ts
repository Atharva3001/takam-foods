import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export type EnquiryStatus = "Enquiry Received" | "Confirmed" | "Rejected" | "Cancelled";

export type Enquiry = {
  id: string;
  enquiryNumber: string;
  createdAt: string;
  updatedAt: string;
  productName: string;
  productSlug: string;
  selectedDay: string;
  quantity: string;
  name: string;
  mobileNumber: string;
  deliveryAddress: string;
  status: EnquiryStatus;
  source: "WhatsApp";
};

type EnquiryState = { enquiries: Enquiry[] };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");
const filePath = path.join(dataDir, "enquiries.json");

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, JSON.stringify({ enquiries: [] }, null, 2), "utf8");
  }
}

export async function readEnquiries(): Promise<EnquiryState> {
  await ensureStore();
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<EnquiryState>;
    return { enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [] };
  } catch {
    return { enquiries: [] };
  }
}

export async function writeEnquiries(state: EnquiryState) {
  await ensureStore();
  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, JSON.stringify(state, null, 2), "utf8");
  await rename(tempPath, filePath);
}
