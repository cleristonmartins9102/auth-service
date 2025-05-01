import { faker } from "@faker-js/faker/.";

import { CreateUserModel } from "@/data/model";

export const makeCreateUserStub = (): CreateUserModel => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    countryDialCode: '+44',
    phoneNumber: faker.phone.number()
})