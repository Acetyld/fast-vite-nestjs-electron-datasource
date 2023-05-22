import { join } from 'node:path'
import { OrdersModule } from '@main/order/order.module'
import { Module } from '@nestjs/common'
import { ElectronModule } from '@doubleshot/nest-electron'
import { BrowserWindow, app } from 'electron'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ElectronModule.registerAsync({
    useFactory: async () => {
      const isDev = !app.isPackaged
      const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
          contextIsolation: true,
          preload: join(__dirname, '../preload/index.js'),
        },
      })

      win.on('closed', () => {
        win.destroy()
      })

      const URL = isDev
        ? process.env.DS_RENDERER_URL
        : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

      win.loadURL(URL)

      return { win }
    },
  }),
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'sqlite',
      database: 'db',
      logging: true,
      autoLoadEntities: true,

      // entities: [`${__dirname}/../**/*.entity.ts`],
      synchronize: true,
    }),
  }),
  OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
