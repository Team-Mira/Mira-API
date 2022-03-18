const app = require('./app')
const request = require('supertest')

describe('test the root path', () => {  
  test('connection to api', async () => {
    const response = await request(app).get('/api/connect');
    expect(response.statusCode).toBe(200);
  });
});
