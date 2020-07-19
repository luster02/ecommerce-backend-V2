import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity';

@Entity('user_details')
export class UserDetails extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    username: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @Column({ type: 'varchar', nullable: true })
    photoURL: string;

    @OneToOne(type => User, user => user.details, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}