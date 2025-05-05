import { CredentialsModel } from "@/data/model";
import { faker } from "@faker-js/faker/.";

export const makeCredentialsStub = (): CredentialsModel => ({
    email: faker.internet.email(),
    token: faker.database.mongodbObjectId(),
    refreshToken: faker.database.mongodbObjectId(),
    password: faker.internet.password(),
    id: faker.database.mongodbObjectId(),
    created_at: new Date(),
    phoneVerified: false
})