// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm'

import { Order } from '@main/order/order.entity'
import type { BrowserWindow } from 'electron'
import { Window } from '@doubleshot/nest-electron'

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  constructor(
    private dataSource: DataSource,
      @Window() private readonly mainWin: BrowserWindow,
  ) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return Order
  }

  afterInsert(event: InsertEvent<Order>) {
    const { webContents } = this.mainWin
    console.log(event.entity)
    webContents.send('new-orders', event.entity)
  }

  afterUpdate(event: UpdateEvent<Order>) {
    const { webContents } = this.mainWin
    webContents.send('new-orders', event.entity)
  }

  afterRemove(event: RemoveEvent<Order>) {
    const { webContents } = this.mainWin
    webContents.send('new-orders', event.entity)
  }
}
