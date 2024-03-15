import { Global, Module } from '@nestjs/common';
import { userProviders } from '../users/infraestructure/model/user.provider';
import { AuthService } from './infraestructure/services/auth.service';
import { AuthApplication } from './application/auth.application';
import { AuthController } from './presentation/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from 'src/core/constants/jwt.constants';
import { UserApplication } from '../users/application/user.application';
import { roleProviders } from '../roles/infraestructure/model/role.provider';

@Global()
@Module({
    providers: [AuthApplication, UserApplication, AuthService, ...userProviders, ...roleProviders],
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '120s' }
        })
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
