import { Controller } from '@nestjs/common'
import { Window } from '@doubleshot/nest-electron'
import { BrowserWindow } from 'electron'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Window() private readonly mainWin: BrowserWindow,
  ) { }
}
