import fs from "fs";
import "jest";
import httpMocks from "node-mocks-http";
import sinon, { SinonSandbox } from "sinon";
import assetPath from "./assetPath";

let sandbox: SinonSandbox;

describe("Server/Middleware", () => {
    describe("assetPath", () => {
        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });
        afterEach(() => {
            sandbox.restore();
        });
        it(`should create default middleware without files"`, () => {
            sandbox.stub(fs, "existsSync").returns(false);
            const mockRequest = httpMocks.createRequest();
            const mockResponse = httpMocks.createResponse();
            const mockNext = jest.fn();
            const handler = assetPath("/path/does/not/exist");
            handler(mockRequest, mockResponse, mockNext);
            expect(mockNext.mock.calls.length).toBe(1);
        });
        it(`should create middleware with files"`, () => {
            sandbox.stub(fs, "existsSync").returns(true);
            sandbox
                .stub(fs, "readFileSync")
                .returns(`{"file.js":"/file.js", "file.css":"/file.css"}`);
            const mockRequest = httpMocks.createRequest();
            const mockResponse = httpMocks.createResponse();
            const mockNext = jest.fn();
            const handler = assetPath("/mock/path");
            handler(mockRequest, mockResponse, mockNext);
            expect(mockRequest).toHaveProperty("files");
            expect(mockNext.mock.calls.length).toBe(1);
        });
    });
});
