import { GithubAuthService } from '../services/github.auth.service';
import { CernAuthService } from '../services/cern.auth.service';

export class AuthServiceFactory {

    constructor(
        private readonly githubAuthService: GithubAuthService,
        private readonly cernAuthService: CernAuthService) { }

    public createAuthService(): GithubAuthService | CernAuthService {
        if (process.env.USE_CERN_SSO) {
            return this.cernAuthService;
        } else {
            return this.githubAuthService;
        }
    }
}
