import { withBackgrounds } from "@storybook/addon-backgrounds";
import { withKnobs } from "@storybook/addon-knobs";
import { withOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";

/**
 * Import remote assets dynamically
 * @todo Find a way to do this through a Decorator or something
 */
import("" + "@src/shared/styles").catch((error: Error) => {
    console.error("Failed to load scss files", error.message);
});

/**
 * Setup storybook addons
 */
addDecorator(
    withOptions({
        addonPanelInRight: true,
        goFullScreen: false,
        name: "Storybook React",
        showSearchBox: false,
    }),
);
addDecorator(
    withBackgrounds([
        { name: "default", value: "transparent", default: true },
        { name: "#000", value: "#000000", default: false },
        { name: "#333", value: "#333333", default: false },
        { name: "twitter", value: "#00aced", default: false },
        { name: "facebook", value: "#3b5998", default: false },
    ]),
);
addDecorator(withKnobs);

/**
 * Stories loader
 */
const req = require.context("@src/shared", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
