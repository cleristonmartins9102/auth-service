"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/main/config/app");
const supertest_1 = __importDefault(require("supertest"));
describe('Create Credential Router', () => {
    process.env.SECRET_KEY = '123456';
    it('should returns 400 if missing param name', async () => {
        const httpResponse = await (0, supertest_1.default)((0, app_1.createApp)())
            .post('/api/token')
            .send({})
            .expect(400);
        expect(httpResponse.body.errors[0].path).toContain('name');
    });
    it('should returns 400 if missing param surname', async () => {
        const httpResponse = await (0, supertest_1.default)((0, app_1.createApp)())
            .post('/api/token')
            .send({})
            .expect(400);
        expect(httpResponse.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({
                path: expect.arrayContaining(['surname'])
            })
        ]));
    });
    it('should returns 400 if missing param password', async () => {
        const httpResponse = await (0, supertest_1.default)((0, app_1.createApp)())
            .post('/api/token')
            .send({})
            .expect(400);
        expect(httpResponse.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({
                path: expect.arrayContaining(['password'])
            })
        ]));
    });
    it('should returns 400 if missing param email', async () => {
        const httpResponse = await (0, supertest_1.default)((0, app_1.createApp)())
            .post('/api/token')
            .send({})
            .expect(400);
        expect(httpResponse.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({
                path: expect.arrayContaining(['email'])
            })
        ]));
    });
    it('should returns 400 if missing param countryDialCode', async () => {
        const httpResponse = await (0, supertest_1.default)((0, app_1.createApp)())
            .post('/api/token')
            .send({})
            .expect(400);
        expect(httpResponse.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({
                path: expect.arrayContaining(['countryDialCode'])
            })
        ]));
    });
    it('should returns 400 if missing param phoneNumber', async () => {
        const httpResponse = await (0, supertest_1.default)((0, app_1.createApp)())
            .post('/api/token')
            .send({})
            .expect(400);
        expect(httpResponse.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({
                path: expect.arrayContaining(['phoneNumber'])
            })
        ]));
    });
});
//# sourceMappingURL=create-credential-router.spec.js.map