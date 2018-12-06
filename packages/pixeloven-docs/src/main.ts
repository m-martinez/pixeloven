#!/usr/bin/env node
import { spawnComplete, spawnYarn } from "@pixeloven/core";
import fs from "fs";
import path from "path";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) =>
    index === "build" ||
    index === "build:story" ||
    index === "serve" ||
    index === "serve:story";

/**
 * Load config file
 * @description First see if a remote config path is available otherwise load the local one
 * @param file
 * @return string
 */
const loadConfigPath = (dir: string): string => {
    const remoteConfig = path.resolve(process.cwd(), dir);
    if (fs.existsSync(remoteConfig)) {
        return remoteConfig;
    }
    return path.resolve(__dirname, dir);
};

/**
 * Setup variables and execute
 *
 * @todo Check for yarn before attempting to execute
 * @todo Show usage for scripts if not in index
 * @todo Allow for custom port/host in .env
 */
const scriptArgs = process.argv.slice(2);
const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
const scriptName = scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];

switch (scriptName) {
    case "build":
    case "build:story": {
        const config = loadConfigPath("./configs");
        const output = path.resolve(process.cwd(), "./dist/public/docs");
        const result = spawnYarn("build-storybook", ["-c", config, "-o", output]);
        spawnComplete(result);
        break;
    }
    case "serve":
    case "serve:story": {
        const config = loadConfigPath("./configs");
        const result = spawnYarn("start-storybook", [
            "--quiet",
            "-s",
            "./public",
            "-p",
            "9001",
            "-c",
            config,
        ]);
        spawnComplete(result);
        break;
    }
    default:
        console.log(`Unknown usage ${scriptName}.`);
        break;
}
