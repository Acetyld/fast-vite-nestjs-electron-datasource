import {Order} from "@main/order/order.entity";

declare global {
  interface Window {
    electron: {
      addOrder(): Promise<Order>,
      ordersStream(cb: (msg: Order) => any): void
    }
  }
}

export { }
