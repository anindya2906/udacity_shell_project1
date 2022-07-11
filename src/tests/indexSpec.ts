import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("API Endpoint Testing", () => {

    it("Should get the Api endpoint", async () => {
        const response = await request.get("/api/image?filename=fjord.jpg&width=200&height=200");
        expect(response.status).toBe(200);
    });

    it("should get error when filename not provided", async () => {
        const response = await request.get("/api/image?width=200&height=200");
        expect(response.text).toEqual('{"error":["Image filename not specified"]}');
    });
});