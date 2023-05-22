import type { Order } from '@main/order/order.entity'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'electron',
  {
    addOrder: (): Promise<Order> => ipcRenderer.invoke('add-order'),
    ordersStream: (cb: (msg: Order) => any) => ipcRenderer.on('new-orders', (e, order: Order) => {
      cb(order)
    }),
  },
)
