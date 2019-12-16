
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
            if (typeof(process.env.ALLOW_ANONYMOUS) !== 'undefined' && process.env.ALLOW_ANONYMOUS.toLowerCase() === 'true') {
                user = true;
            } else {
                throw err || new UnauthorizedException();
            }
        }

        return user;
    }
}