const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

before(async () => {
    process.env.USE_IN_MEMORY_DB = "true";

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Solar System API Tests", () => {

    it("GET /live should return status live", async () => {
        const res = await request(app).get('/live');
        if (res.body.status !== "live") throw new Error("Live endpoint failed");
    });

    it("GET /ready should return status ready", async () => {
        const res = await request(app).get('/ready');
        if (res.body.status !== "ready") throw new Error("Ready endpoint failed");
    });

});
