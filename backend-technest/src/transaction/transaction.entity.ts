import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
    @ObjectIdColumn()
    _id?: string;

    @PrimaryColumn()
    id: string;

    @Column()
    accountId: string;

    @Column()
    confirmedDate: string;

    @Column()
    orderId: string;

    @Column()
    orderCode: string;

    @Column()
    transactionType: string;

    @Column()
    debit: number;

    @Column()
    credit: number;

    @Column()
    balance: number;
}