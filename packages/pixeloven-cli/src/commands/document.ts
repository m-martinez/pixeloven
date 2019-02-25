import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--document"],
    name: "document",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, typeDoc } = context;
        /**
         * Process results
         * @param name 
         * @param status 
         */
        const handle = (name: string, status: number) => {
            if (status) {
                print.error(`${name} exited with status ${status}`);
                process.exit(status);
            } else {
                print.success(
                    `Success! What's up doc(s).`,
                );
            }
            return status;
        }
        switch (parameters.first) {
            case "ts":
            case "tsx": {
                const argList = parameters.argv && parameters.argv.length 
                    ? parameters.argv.slice(4)
                    : [];
                const results = await typeDoc(argList);
                return handle("TypeDoc", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
