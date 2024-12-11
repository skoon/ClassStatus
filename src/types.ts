export type Destination = 'Bathroom' | 'Office' | 'Other Class';

export interface StudentLogEntry {
<<<<<<< HEAD
  id?: string;
=======
  id: string | "";
>>>>>>> f6300c635867b363a0f356823400287aa65886eb
  name: string;
  destination: Destination;
  checkOutTime: Date;
  checkInTime?: Date;
}