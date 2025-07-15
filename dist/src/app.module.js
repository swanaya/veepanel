"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const sites_module_1 = require("./sites/sites.module");
const databases_module_1 = require("./databases/databases.module");
const email_module_1 = require("./email/email.module");
const ssl_module_1 = require("./ssl/ssl.module");
const backup_module_1 = require("./backup/backup.module");
const system_module_1 = require("./system/system.module");
const dns_module_1 = require("./dns/dns.module");
const appConfig_1 = require("./utils/appConfig");
const appConfig = (0, appConfig_1.loadAppConfig)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: appConfig.mongodb.uri,
                useUnifiedTopology: true,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            sites_module_1.SitesModule,
            databases_module_1.DatabasesModule,
            email_module_1.EmailModule,
            ssl_module_1.SslModule,
            backup_module_1.BackupModule,
            system_module_1.SystemModule,
            dns_module_1.DnsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map