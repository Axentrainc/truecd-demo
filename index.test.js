const request = require('supertest');
const app = require('./index');

describe('TrueCD Task Manager API', () => {

  test('GET / returns task list', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Wrong Message');
    expect(response.body.tasks).toHaveLength(3);
  });

  test('POST /tasks adds a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Deploy via Azure DevOps pipeline' });
    expect(response.status).toBe(200);
    expect(response.body.task.title).toBe('Deploy via Azure DevOps pipeline');
    expect(response.body.task.completed).toBe(false);
  });

  test('PUT /tasks/:id/complete marks task as complete', async () => {
    const response = await request(app)
      .put('/tasks/1/complete');
    expect(response.status).toBe(200);
    expect(response.body.task.completed).toBe(true);
  });

  test('PUT /tasks/999/complete returns 404 for missing task', async () => {
    const response = await request(app)
      .put('/tasks/999/complete');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });

});