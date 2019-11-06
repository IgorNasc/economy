import { Category } from './category.model';

export class Extrato {
  id: number;
  name: string;
  type: string;
  value: number;
  category: Category;
  date: Date;
}
