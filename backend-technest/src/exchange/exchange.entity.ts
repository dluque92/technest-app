import { PrimaryColumn, Entity } from 'typeorm';

@Entity()
export class Exchange {
    @PrimaryColumn()
    USD: number;
}