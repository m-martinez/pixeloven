import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, jest } = context;
        /**
         * Process results
         * @param name
         * @param status
         */
        const handle = (name: string, status: number) => {
            if (status) {
                print.error(`${name} exited with status ${status}\n`);
                process.exit(status);
            } else {
                print.success(`Success! Untouchable.\n`);
            }
            return status;
        };
        switch (parameters.first) {
            case "watch": {
                const argList =
                    parameters.array && parameters.array.length
                        ? parameters.array.slice(1)
                        : [];
                const results = await jest(["--watch"].concat(argList));
                return handle("Jest", results.status);
            }
            default: {
                const results = await jest(parameters.array);
                return handle("Jest", results.status);
            }
        }
    },
};
