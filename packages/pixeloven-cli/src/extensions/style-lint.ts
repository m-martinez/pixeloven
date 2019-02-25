import { PixelOvenRunContext, StyleLintExtension } from "../types";

export default (context: PixelOvenRunContext) => {
    const { pixelOven } = context;

    const styleLint: StyleLintExtension = async (args: string[] = []) => {
        const fileName = "stylelint.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(["stylelint", "--syntax", "scss", "--config", configPath].concat(args));
        }
        return pixelOven.run(["stylelint", "--syntax", "scss"].concat(args));
    };
    context.styleLint = styleLint;
};
