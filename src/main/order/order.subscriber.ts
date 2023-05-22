import { Window } from '@doubleshot/nest-electron'
import { Order } from '@main/order/order.entity'
import type { BrowserWindow } from 'electron'
import { EventSubscriber } from 'typeorm'
import type {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent, RemoveEvent, UpdateEvent,
} from 'typeorm'

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  constructor(
    dataSource: DataSource,
      @Window() private readonly mainWin: BrowserWindow,
  ) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return Order
  }

  afterInsert(event: InsertEvent<Order>) {
    const { webContents } = this.mainWin
    webContents.send('reply-msg', event.entity)
  }

  afterUpdate(event: UpdateEvent<Order>) {
    const { webContents } = this.mainWin
    webContents.send('reply-msg', event.entity)
  }

  afterRemove(event: RemoveEvent<Order>) {
    const { webContents } = this.mainWin
    webContents.send('reply-msg', event.entity)
  }
}
