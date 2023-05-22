import { ElectronExternalModule } from '@main/electron_external.module'
import { OrdersModule } from '@main/order/order.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ElectronExternalModule,
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
