import { Operation } from './operations.model';

export class Gastos {
    id: number;
    date: Date;
    operations: Array<Operation>;
}