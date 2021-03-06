import { JestExtension, PixelOvenRunContext } from "../types";

export default (context: PixelOvenRunContext) => {
    const jest: JestExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "jest.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(
                [
                    "jest",
                    "--maxWorkers",
                    "2",
                    "--config",
                    configPath,
                    "--env=jsdom",
                ].concat(args),
            );
        }
        return pixelOven.run(
            ["jest", "--maxWorkers", "2", "--env=jsdom"].concat(args),
        );
    };
    context.jest = jest;
};
