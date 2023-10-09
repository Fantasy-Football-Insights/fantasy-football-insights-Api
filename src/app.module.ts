import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./api/auth/auth.module";
import { UsersModule } from "./api/users/users.module";

import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users/user.entity";

import configuration from "config/configuration";

@Module({
  imports: [
    // Load env variables from configuration file
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    // Connect to database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get("database"),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    // Import modules
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
