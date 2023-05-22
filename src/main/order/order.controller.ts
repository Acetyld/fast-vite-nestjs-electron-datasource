import { IpcHandle, Window } from '@doubleshot/nest-electron'
import { Order } from '@main/order/order.entity'
import { OrderService } from '@main/order/order.service'
import { Controller } from '@nestjs/common'
import { BrowserWindow } from 'electron'

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
        @Window() private readonly mainWin: BrowserWindow,
  ) { }

  @IpcHandle('get-orders')
  public async handleSendMsg(): Promise<Order[]> {
    const { webContents } = this.mainWin
    webContents.send('reply-msg', 'this is msg from webContents.send')
    return await this.orderService.getOrders()
  }

  @IpcHandle('add-order')
  public async addOrder(): Promise<Order> {
    return await this.orderService.addOrder()
  }
}
