import { Order } from '@main/order/order.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class OrderService {
  constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
  ) {
  }

  public async getOrders(): Promise<Order[]> {
    return this.orderRepository.find()
  }

  public async addOrder(): Promise<Order> {
    const newOrder = new Order()
    newOrder.score = 5
    newOrder.started_at = new Date()
    newOrder.ended_at = new Date()
    return this.orderRepository.save(newOrder)
  }
}
