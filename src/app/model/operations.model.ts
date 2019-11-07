import { Category } from './category.model';

export class Operation {
    id: number;
    name: string;
    type: string;
    value: number;
    category: Category;
}