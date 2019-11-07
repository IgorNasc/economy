import { Operation } from './operations.model';

export class Renda {
    id: number;
    date: Date;
    operations: Array<Operation>;
}