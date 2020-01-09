const request = require('supertest');

const server = require('./server');

describe('server.js', function () {
    describe("environment", function () {
        it("should set environment to development", function () {
            expect(process.env.NODE_ENV).toBe("development");
        });
    });

    describe("GET /api", function () {
        it("should return a 200 OK", function () {
            // spin up the server
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
            // make GET request to /
            // look at the http status code for the response
        });

        it("should return a JSON", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should return {api: 'up'}", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.body.message).toBe("Project: food-truck-trackr is up and running!");
                });
        });

        it('should block access to users without authorization', function () {
            return request(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).toBe(400);
                    expect(res.body.message).toBe("Please login and try again");
                });
        })

        it("should reject an incorrect password", function () {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "testDiner", password: "wrong", role: 1 })
                .then(res => {
                    expect(res.status).toBe(401);
                    expect(res.body.message).toBe("Invalid credentials")
                    // return request(server)
                    //     .get("/api/users")
                    //     .set("authorization", token)
                    //     .then(res => {
                    //         expect(res.status).toBe(200);
                    //         expect(Array.isArray(res.body)).toBe(true);
                    //     });
                });
        });
    });
});