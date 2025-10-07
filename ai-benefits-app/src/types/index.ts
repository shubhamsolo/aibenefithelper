// src/types/index.ts
export interface Benefit {
  id: string;
  category: 'Dental' | 'Vision' | 'Mental Health' | 'OPD';
  title: string;
  coverage: string;
  description: string;
}