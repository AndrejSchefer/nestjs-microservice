import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public isActive: boolean;

  @Column()
  public registrationDate: Date;

  @BeforeInsert()
  public emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
