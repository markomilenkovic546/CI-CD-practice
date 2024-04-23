import { faker } from '@faker-js/faker';

export const createRandomUser = () => {
    return {
        username: faker.string.alpha({
            length: 5
        }),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 10,
            mix_case: true
        }),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
    };
};

export const createRandomUserWithInvalidEmail = () => {
    return {
        username: faker.internet.userName(),
        email: `${faker.internet.userName()}@@.com`,
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
    };
};
