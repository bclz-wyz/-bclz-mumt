import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsController } from './services/applications/applications.controller';

@Module({
  imports: [],
  controllers: [AppController, ApplicationsController],
  providers: [AppService],
})
export class AppModule {}
