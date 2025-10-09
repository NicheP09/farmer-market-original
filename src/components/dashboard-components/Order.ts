export type Order = {
  id: number;
  farmer: string;
  items: number;
  date: string;
  location: string;
  status: "Pending" | "Accepted" | "Rejected";
  trackingId: string;
};

export const orders: Order[] = [
  {
    id: 1524,
    farmer: "Bayo Damilare",
    items: 2,
    date: "Sept 20, 2025 10:12",
    location: "Ajah Lagos",
    status: "Pending",
    trackingId: "4521RESS54421212",
  },
  {
    id: 14753,
    farmer: "Nkechi Uche",
    items: 1,
    date: "Jul 18, 2025 04:55",
    location: "Dutse, Jigawa",
    status: "Accepted",
    trackingId: "84523W4CCF1445",
  },
  {
    id: 728,
    farmer: "Kemisola Adiyan",
    items: 1,
    date: "Jul 1, 2025 17:44",
    location: "Esan west, Edo",
    status: "Accepted",
    trackingId: "987SD1258157W1E2",
  },
  {
    id: 728,
    farmer: "Kolawole Joseph",
    items: 1,
    date: "Aug 29, 2024 20:01",
    location: "Abakaliki, Ebonyi",
    status: "Rejected",
    trackingId: "1457ASD12581T4EE",
  },
  {
    id: 728,
    farmer: "Matthew Armstrong",
    items: 1,
    date: "Feb 14, 2024 18:27",
    location: "Dukku, Gombe",
    status: "Accepted",
    trackingId: "7ASD125555813457",
  },
];
