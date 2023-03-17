"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom/client");
function LikeButton() {
    const [liked, setLiked] = React.useState(false);
    if (liked) {
        return React.createElement("div", null, "\"You liked this!\"");
    }
    return React.createElement("button", { onClick: () => setLiked(true) }, "Like");
}
const rootNode = document.getElementById("like-button-root");
if (rootNode) {
    const root = ReactDOM.createRoot(rootNode);
    root.render(React.createElement(LikeButton));
}
//# sourceMappingURL=like-button.js.map