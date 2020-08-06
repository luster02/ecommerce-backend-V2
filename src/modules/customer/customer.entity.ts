import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'
import { CustomerDetail } from './customer.detail.entity'
import { Cart } from '../cart/cart.entity'

@Entity('customer')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @OneToOne(type => CustomerDetail, customerDetails => customerDetails.customer, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE' })
    details: CustomerDetail;

    @OneToOne(type => Cart, cart => cart.customer, { cascade: true, eager: true, onDelete: 'CASCADE' })
    cart: Cart

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
