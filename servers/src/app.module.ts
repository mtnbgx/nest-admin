import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import configuration from './config/index'
import { UserModule } from './system/user/user.module'

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return { type: 'mysql', entities: ['dist/**/*.entity{.ts,.js}'], ...config.get('db.mysql') }
      },
    }),
    // 模块
    UserModule,
  ],
})
export class AppModule {}
