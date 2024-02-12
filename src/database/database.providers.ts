import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({ // TODO: taking from env or config and secret from cloud secret manager
        type: 'mysql',
        host: 'localhost',
        port: 3316,
        username: 'root',
        password: 'root',
        database: 'centralized_event_publisher',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true, // TODO: disable for production and use migrations
        migrations: []
      });

      return dataSource.initialize();
    },
  },
];