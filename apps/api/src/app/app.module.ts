import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'),
            MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
