import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SitesModule } from './sites/sites.module';
import { DatabasesModule } from './databases/databases.module';
import { EmailModule } from './email/email.module';
import { SslModule } from './ssl/ssl.module';
import { BackupModule } from './backup/backup.module';
import { SystemModule } from './system/system.module';
import { DnsModule } from './dns/dns.module';
import { loadAppConfig } from './utils/appConfig';

const appConfig = loadAppConfig();

@Module({
  imports: [
    // Database - Using MongoDB for production
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: appConfig.mongodb.uri,
      useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production and use migrations
      logging: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    SitesModule,
    DatabasesModule,
    EmailModule,
    SslModule,
    BackupModule,
    SystemModule,
    DnsModule,
  ],
})
export class AppModule {} 