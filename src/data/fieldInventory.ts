export interface Field {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  openHour: string;
  closeHour: string;
}

export const fieldInventory: Field[] = [
  {
    id: "field-1",
    name: "Lapangan Mini Soccer 1",
    type: "Mini Soccer",
    image: "/assets/mini-soccer.jpg",
    price: 300000,
    rating: 4.8,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-2",
    name: "Lapangan Mini Soccer 2",
    type: "Mini Soccer",
    image: "/assets/mini-soccer.jpg",
    price: 300000,
    rating: 4.7,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-3",
    name: "Lapangan Futsal Indoor",
    type: "Futsal",
    image: "/assets/futsal.jpg",
    price: 200000,
    rating: 4.9,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-4",
    name: "Lapangan Futsal Outdoor",
    type: "Futsal",
    image: "/assets/futsal.jpg",
    price: 180000,
    rating: 4.6,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-5",
    name: "Lapangan Badminton 1",
    type: "Badminton",
    image: "/assets/badminton.jpg",
    price: 100000,
    rating: 4.8,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-6",
    name: "Lapangan Badminton 2",
    type: "Badminton",
    image: "/assets/badminton.jpg",
    price: 100000,
    rating: 4.7,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-7",
    name: "Lapangan Padel 1",
    type: "Padel",
    image: "/assets/padel.jpg",
    price: 150000,
    rating: 4.9,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
  {
    id: "field-8",
    name: "Lapangan Padel 2",
    type: "Padel",
    image: "/assets/padel.jpg",
    price: 150000,
    rating: 4.8,
    isAvailable: true,
    openHour: "06:00",
    closeHour: "23:00",
  },
];
