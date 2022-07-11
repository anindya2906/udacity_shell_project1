import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("API Endpoint Testing", () => {

    it("Should get the Api endpoint", async () => {
        const response = await request.get("/api/image?filename=fjord.jpg&width=200&height=200");
        expect(response.status).toBe(200);
    });

    describe("Filename errors", () => {
        it("should get error for not providing filename", async () => {
            const response = await request.get("/api/image?width=200&height=200");
            expect(response.text).toEqual('{"error":["Image filename not specified"]}');
            expect(response.status).toBe(400);
        });
        
        it("should get error for providing wrong filename", async () => {
            const response = await request.get("/api/image?filename=sample.jpg&width=200&height=200");
            expect(response.text).toEqual('{"error":["File sample.jpg does not exist"]}');
            expect(response.status).toBe(400);
        });
    });

    describe("Width errors", () => {
        it("should get error for not providing width", async () => {
            const response = await request.get("/api/image?filename=fjord.jpg&height=200");
            expect(response.text).toEqual('{"error":["Image width not specified"]}');
            expect(response.status).toBe(400);
        });
        
        it("should get error for providing non integer width", async () => {
            const response = await request.get("/api/image?filename=fjord.jpg&width=abcd&height=200");
            expect(response.text).toEqual('{"error":["Width should be a positive integer"]}');
            expect(response.status).toBe(400);
        });

        it("should get error for providing negative width", async () => {
            const response = await request.get("/api/image?filename=fjord.jpg&width=-10&height=200");
            expect(response.text).toEqual('{"error":["Width should be a positive integer"]}');
            expect(response.status).toBe(400);
        });
    });
    
    describe("Height errors", () => {
        it("should get error for not providing height", async () => {
            const response = await request.get("/api/image?filename=fjord.jpg&width=200");
            expect(response.text).toEqual('{"error":["Image height not specified"]}');
            expect(response.status).toBe(400);
        });
        
        it("should get error for providing non integer height", async () => {
            const response = await request.get("/api/image?filename=fjord.jpg&height=abcd&width=200");
            expect(response.text).toEqual('{"error":["Height should be a positive integer"]}');
            expect(response.status).toBe(400);
        });

        it("should get error for providing negative height", async () => {
            const response = await request.get("/api/image?filename=fjord.jpg&height=-10&width=200");
            expect(response.text).toEqual('{"error":["Height should be a positive integer"]}');
            expect(response.status).toBe(400);
        });
    });
});