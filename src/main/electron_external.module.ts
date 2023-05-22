import { join } from 'node:path' // Import the external module
import { ElectronModule } from '@doubleshot/nest-electron'
import { Module } from '@nestjs/common'
import { BrowserWindow, app } from 'electron'

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
  })],
  exports: [ElectronModule], // Export the external module
})
export class ElectronExternalModule {}
