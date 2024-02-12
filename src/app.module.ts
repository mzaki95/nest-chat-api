import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
