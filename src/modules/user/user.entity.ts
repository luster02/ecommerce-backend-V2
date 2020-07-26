import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'
import { UserDetails } from './user.detail.entity'
import { Role } from '../role/role.entity';
import { Shop } from '../shop/shop.entity';
import { Gallery } from '../gallery/gallery.entity';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @OneToOne(type => UserDetails, userDetails => userDetails.user, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE' })
    details: UserDetails;

    @OneToOne(type => Gallery, gallery => gallery.user, { cascade: true, eager: true, onDelete: 'CASCADE' })
    gallery: Gallery

    @OneToOne(type => Shop, shop => shop.user, { cascade: true, eager: true, onDelete: 'CASCADE' })
    shop: Shop

    @ManyToMany(type => Role, role => role.users, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}