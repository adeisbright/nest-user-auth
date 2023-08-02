import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config'; 

const {database : {databaseName , port , username , password , host }} = config()
@Module({
  imports: [
    UserModule, 
    AuthModule, 
    TypeOrmModule.forRoot({
      type: "mysql",
      host,
      username,
      password,
      database: databaseName,
      port,
      autoLoadEntities: true, 
      synchronize : true 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
