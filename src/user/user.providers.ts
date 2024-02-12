import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY', // TODO: put into constant
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'], // TODO: put into constant
  },
];