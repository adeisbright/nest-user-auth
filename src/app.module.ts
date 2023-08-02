import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ConfigModule.forRoot({ 
      load : [config],
      isGlobal: true, 
      cache : true 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
