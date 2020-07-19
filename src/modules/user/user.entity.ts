import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { UserDetails } from './user.detail.entity'
import { Role } from '../role/role.entity';

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

    @ManyToMany(type => Role, role => role.users, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}