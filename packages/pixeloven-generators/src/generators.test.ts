import "jest";
import generator, {
    capitalize,
    lowerCase,
    plural,
    upperCase,
    validateComponentType,
    validateMinLength,
    validateRequestMethod,
    validateWord,
} from "./generators";
import { HelperFunction, Plop, PlopGenerator } from "./plop";

interface PlopGenerators {
    [name: string]: PlopGenerator;
}

interface HelperFunctions {
    [name: string]: HelperFunction;
}

const plopGenerators: PlopGenerators = {};
const plopHelpers: HelperFunctions = {};

const MockPlop: Plop = {
    getGenerator: (name: string): PlopGenerator => {
        return plopGenerators[name];
    },
    getHelper: (name: string): HelperFunction => {
        return plopHelpers[name];
    },
    setGenerator: (name: string, config: PlopGenerator): PlopGenerator => {
        plopGenerators[name] = config;
        return plopGenerators[name];
    },
    setHelper: (name: string, fn: HelperFunction): void => {
        plopHelpers[name] = fn;
    },
};

describe("@pixeloven/generators", () => {
    describe("plopfile", () => {
        describe("generator", () => {
            it(`should set "generators" and "helpers"`, () => {
                generator(MockPlop);
                expect(typeof MockPlop.getGenerator("component")).toEqual(
                    "object",
                );
                expect(typeof MockPlop.getGenerator("store")).toEqual("object");
                expect(typeof MockPlop.getHelper("capitalize")).toEqual(
                    "function",
                );
                expect(typeof MockPlop.getHelper("plural")).toEqual("function");
                expect(typeof MockPlop.getHelper("upperCase")).toEqual(
                    "function",
                );
                expect(typeof MockPlop.getHelper("lowerCase")).toEqual(
                    "function",
                );
            });
        });
        describe("validateComponentType", () => {
            it(`should fail with value "test"`, () => {
                expect(typeof validateComponentType("test")).toEqual("string");
            });
            it(`should pass with value "atom"`, () => {
                const value = validateComponentType("atom");
                expect(typeof value).toEqual("boolean");
                expect(value).toEqual(true);
            });
        });
        describe("validateWord", () => {
            it(`should fail with empty string`, () => {
                expect(typeof validateWord("")).toEqual("string");
            });
            it(`should fail with value "not_word"`, () => {
                expect(typeof validateWord("not_word")).toEqual("string");
            });
            it(`should pass with value "word"`, () => {
                const value = validateWord("word");
                expect(typeof value).toEqual("boolean");
                expect(value).toEqual(true);
            });
        });
        describe("validateMinLength", () => {
            it(`should create min length validator and fail`, () => {
                expect(typeof validateMinLength(2)("t")).toEqual("function");
            });
            it(`should create min length validator and pass`, () => {
                expect(typeof validateMinLength(1)("t")).toEqual("function");
            });
        });
        describe("validateRequestMethod", () => {
            it(`should fail with value "test"`, () => {
                expect(typeof validateRequestMethod("test")).toEqual("string");
            });
            it(`should pass with value "GET"`, () => {
                const value = validateRequestMethod("GET");
                expect(typeof value).toEqual("boolean");
                expect(value).toEqual(true);
            });
        });
        describe("capitalize", () => {
            it("should lower case word and upper case first letter", () => {
                expect(capitalize("TEST")).toEqual("Test");
            });
        });
        describe("lowerCase", () => {
            it("should lower case word", () => {
                expect(lowerCase("TEST")).toEqual("test");
            });
        });
        describe("plural", () => {
            it(`should append an "s" to the end of a string`, () => {
                expect(plural("test")).toEqual("tests");
            });
        });
        describe("upperCase", () => {
            it("should upper case word", () => {
                expect(upperCase("test")).toEqual("TEST");
            });
        });
    });
});
