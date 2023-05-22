import { ElectronExternalModule } from '@main/electron_external.module'
import { OrderController } from '@main/order/order.controller'
import { Order } from '@main/order/order.entity'
import { OrderService } from '@main/order/order.service'
import { OrderSubscriber } from '@main/order/order.subscriber'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ElectronExternalModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderSubscriber],
})
export class OrdersModule {}
