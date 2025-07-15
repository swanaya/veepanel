import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: 'user' })
  role: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  // Security flags
  @Column({ default: false })
  forcePasswordChange: boolean;

  @Column({ default: false })
  isTemporaryEmail: boolean;

  @Column({ default: false })
  setupCompleted: boolean;

  // 2FA fields
  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column('simple-array', { nullable: true })
  twoFactorBackupCodes: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
} 