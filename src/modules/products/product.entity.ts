import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm'
import { Shop } from '../shop/shop.entity';

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string

    @Column({ type: 'varchar', nullable: false })
    description: string

    @Column({ type: 'integer', nullable: false })
    price: number

    @Column({ type: 'varchar', nullable: false })
    category: string

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(type => Shop, shop => shop.products, { onDelete: 'CASCADE' })
    shop: Shop
}