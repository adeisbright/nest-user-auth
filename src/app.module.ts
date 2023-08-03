import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config'; 
import { CacheModule } from '@nestjs/cache-manager';

const {database : {databaseName , port , username , password , host }} = config()
@Module({
  imports: [
    UserModule, 
    AuthModule, 
    TypeOrmModule.forRoot({
      type: "postgres",
      host,
      username,
      password,
      database: databaseName,
      port,
      autoLoadEntities: true, 
      synchronize : true 
    }), 
    CacheModule.register()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
