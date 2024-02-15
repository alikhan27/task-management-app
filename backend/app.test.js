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

    it('GET /api/task/1 => items by ID', () => {
        return request(app)
          .get('/api/task/1')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                title: expect.any(String),
                description: expect.any(String),
              })
            );
          });
      });

      it('GET /api/task/1 => items by ID not found', () => {
        return request(app)
          .get('/api/task/1000000')
          .expect(404)
      });
})