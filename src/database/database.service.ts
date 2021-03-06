import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { ConnectionOptions } from 'typeorm'
import { Configuration } from '../config/config.key'

export const databaseProvider = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                type: config.get(Configuration.BD_ENGINE),
                port: Number(config.get(Configuration.DB_PORT)),
                host: config.get(Configuration.HOST),
                database: config.get(Configuration.DATABASE),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + 'migrations/*{.ts,.js}']
            } as ConnectionOptions
        }
    })
]