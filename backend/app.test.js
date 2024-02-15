const request = require('supertest');
const app = require('./app');

describe("GET /", () => {
    it('GET /api/tasks => all items', () => {
        return request(app).get('/api/tasks')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([])
                );
            }))
    })
})