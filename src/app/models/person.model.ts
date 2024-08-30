// src/app/models/person.model.ts
export interface Person {
    id: string;
    name: string;
    address: string;
    dni: string;
    entryDate: Date;
    gender: string;
    status: string;
    email?: string;
  }