"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreError = exports.WrongPasswordError = exports.CredentialsNotFoundError = exports.ExpiredTokenError = exports.JwtAdapterError = exports.NoSecretFoundError = void 0;
class NoSecretFoundError extends Error {
    constructor() {
        super('Not found secret key');
        this.name = 'NoSecretFoundError';
    }
}
exports.NoSecretFoundError = NoSecretFoundError;
class JwtAdapterError extends Error {
    constructor(error) {
        super(error.message);
        this.name = 'JwtAdapterError';
    }
}
exports.JwtAdapterError = JwtAdapterError;
class ExpiredTokenError extends Error {
    constructor(error) {
        super(error.message);
        this.name = 'ExpiredTokenError';
    }
}
exports.ExpiredTokenError = ExpiredTokenError;
class CredentialsNotFoundError extends Error {
    constructor(fieldName, value) {
        super(`Cresdentials not found with ${fieldName} ${value}`);
        this.name = 'CredentialsNotFoundError';
    }
}
exports.CredentialsNotFoundError = CredentialsNotFoundError;
class WrongPasswordError extends Error {
    constructor() {
        super(`Wrong password!`);
        this.name = 'WrongPasswordError';
    }
}
exports.WrongPasswordError = WrongPasswordError;
class FirestoreError extends Error {
    constructor(error) {
        super(`Firestore error ${error.message}`);
        this.name = 'FirestoreError';
    }
}
exports.FirestoreError = FirestoreError;
//# sourceMappingURL=errors.js.map