"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCreateCredential = void 0;
class DbCreateCredential {
    constructor(jwtAdapter, bcryptAdapter, fsCredentialRepository) {
        this.jwtAdapter = jwtAdapter;
        this.bcryptAdapter = bcryptAdapter;
        this.fsCredentialRepository = fsCredentialRepository;
    }
    async create(userModel) {
        const token = this.jwtAdapter.encrypt(userModel, '15m');
        const refreshToken = this.jwtAdapter.encrypt(userModel, '730h');
        const password = await this.bcryptAdapter.hash(userModel.password);
        await this.fsCredentialRepository.create({
            token,
            refreshToken,
            email: userModel.email,
            password: password,
            phoneVerified: false
        });
        return {
            token,
            refreshToken,
            payload: userModel
        };
    }
}
exports.DbCreateCredential = DbCreateCredential;
//# sourceMappingURL=db-create-credential.js.map