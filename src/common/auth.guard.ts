
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest(err, user, _info) {
        if (err || !user) {
            if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
                user = true;
            } else {
                throw err || new UnauthorizedException();
            }
        }

        return user;
    }
}