import handler from './weather.js';     //This imports your actual weather API function from weather.js
import httpMocks from 'node-mocks-http';     //We use this package to fake HTTP req (request) and res (response) objects, so you can call the handler like it's running on a server.

test('Returns valid weather structure (mocked)', async () => {
  const req = httpMocks.createRequest({
    method: 'GET',
    query: { city: 'Riyadh' }
  });
  const res = httpMocks.createResponse();

  // Mock env variable
  process.env.OPENWEATHER_API_KEY = 'test';

  // Mock axios
  jest.mock('axios', () => ({
    get: () => Promise.resolve({
      data: {
        name: 'Riyadh',
        main: { temp: 33.5, humidity: 20 },
        weather: [{ main: 'Clear' }]
      }
    })
  }));

  await handler(req, res);
  const data = res._getJSONData();

  expect(res.statusCode).toBe(200);
  expect(data).toHaveProperty('city', 'Riyadh');
  expect(data).toHaveProperty('temperature');
  expect(data).toHaveProperty('condition');
  expect(data).toHaveProperty('humidity');
});
