const supertest = require('supertest');
const creatApp = require('./app.js');
const app = creatApp();
const request = supertest(app);

test('GET /', async () => {
    const response = await request.get('/')
        .expect(200)
        .expect('Content-Type', 'text/html')
    expect(response.text).toEqual('<h1>Welcome to the world wide web</h1>')
})