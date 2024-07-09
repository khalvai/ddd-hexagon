import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/User/UserModule';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ UserModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot()
  ],
  controllers: [ AppController ],
  providers: [ AppService, ConfigService ],
})
export class AppModule { }
