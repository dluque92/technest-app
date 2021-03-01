import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
    @ObjectIdColumn()
    _id?: string;

    @PrimaryColumn()
    id: string;

    @Column()
    accountName: string;

    @Column()
    category: string;

    @Column()
    tag: string;

    @Column()
    balance: number;

    @Column()
    availableBalance: number;
}