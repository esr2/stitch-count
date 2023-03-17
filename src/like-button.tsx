import * as React from "react";
import * as ReactDOM from "react-dom/client";

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return <div>"You liked this!"</div>;
  }

  return <button onClick={() => setLiked(true)}>Like</button>;
}

const rootNode = document.getElementById("like-button-root");
if (rootNode) {
  const root = ReactDOM.createRoot(rootNode);
  root.render(React.createElement(LikeButton));
}
