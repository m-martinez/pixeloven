import { PixelOvenRunContext } from "@pixeloven/cli";
import { Config as BuildConfig } from "@pixeloven/webpack-builder";
import { Config as CompilerConfig } from "@pixeloven/webpack-config";
import { Config as ServerConfig } from "@pixeloven/webpack-dev-server";

export enum WebpackExtensionType {
    build = "build",
    start = "start",
}

export interface WebpackExtensionOptions {
    type: WebpackExtensionType;
    buildOptions?: BuildConfig;
    compilerOptions?: CompilerConfig;
    serverOptions?: ServerConfig;
}
export type WebpackExtension = (
    options: WebpackExtensionOptions,
) => Promise<number>;

export interface AddonWebpackRunContext extends PixelOvenRunContext {
    webpack: WebpackExtension;
}
