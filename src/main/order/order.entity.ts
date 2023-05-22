import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
    score: number

  @Column({ type: 'datetime' })
    started_at: Date

  @Column({ type: 'datetime' })
    ended_at: Date
}
