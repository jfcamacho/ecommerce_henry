import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/POST /auth/signin with orrect credentials', async () => {
    const users = await request(app.getHttpServer()).post('/auth/signin').send({email: "test@gmail.com", password: "$test1A1830"})
    token = users.body.token
    expect(users.status).toBe(201)
    expect(users.body.token).toBeDefined()
  })
  it('/GET /products', async () => {
    const users = await request(app.getHttpServer()).get('/products')
    expect(users.status).toBe(200)
    expect(users.body).toBeInstanceOf(Array)
  })//
  it('/GET /users doens´t have field password', async () => {
    const users = await request(app.getHttpServer()).get('/users').set('Authorization', `${token}`)
    // console.log(users);
    expect(users.status).toBe(200)
    expect(users.body).toBeInstanceOf(Array)
    expect(users.body[0].password).toBeUndefined()
  })
  it('/GET /users error because don´t have token', async () => {
    const users = await request(app.getHttpServer()).get('/users')
    // console.log(users);
    expect(users.status).toBe(400)
    expect(users.body.message).toEqual('No se ha provisto del token respectivo')
  })
  it('/GET /users/:id have password', async () => {
    const users = await request(app.getHttpServer()).get('/users/da7d144f-d3c2-49da-99fe-cbc1b0a72b2c').set('Authorization', `${token}`)
    expect(users.status).toBe(200)
    expect(users.body).toBeInstanceOf(Object)
    expect(users.body.password).toBeDefined()
  })
  it('/GET /orders', async () => {
    const users = await request(app.getHttpServer()).get('/orders').set('Authorization', `${token}`)
    // console.log(users);
    expect(users.status).toBe(200)
    expect(users.body).toBeInstanceOf(Object)
  })
  it('/GET /categories', async () => {
    const users = await request(app.getHttpServer()).get('/categories')
    // console.log(users);
    expect(users.status).toBe(200)
    expect(users.body).toBeInstanceOf(Array)
  })
  it('/POST /auth/signin without credentiales must provide an error', async () => {
    const users = await request(app.getHttpServer()).post('/auth/signin').send({email: "", password: ""})
    console.log(users);
    expect(users.status).toBe(400)
    expect(users.body.message).toEqual("Email o password incorrectos")
  })
});
