const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback(); //zerando banco antes de realizar novo teste, se não for zerado, pode ser que um teste influencie em outro a medida que os dados estão populando o mesmo banco de dados de teste
        await connection.migrate.latest(); //realizando migration para que o teste tenha um ambiente "real" para realizar teste
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAE",
                email: "contato@teste.com.br",
                whatsapp: "1400000000",
                city: "Bauru",
                uf: "SP"
            });

            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });
});