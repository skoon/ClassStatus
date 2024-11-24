export type Destination = 'Bathroom' | 'Office' | 'Other Class';

export interface StudentLogEntry {
  id?: string;
  name: string;
  destination: Destination;
  checkOutTime: Date;
  checkInTime?: Date;
}