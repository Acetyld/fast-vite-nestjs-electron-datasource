import type { Order } from '@main/order/order.entity'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'electron',
  {
    addOrder: (): Promise<Order> => ipcRenderer.invoke('add-order'),
    ordersStream: (callback) => {
      ipcRenderer.on('new-orders', callback)
      return () => {
        ipcRenderer.removeListener('new-orders', callback)
      }
    },
  },
)
