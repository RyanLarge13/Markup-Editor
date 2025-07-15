import { parse } from "./parser.js";

const markdownMap = new Map();

markdownMap.set("# ", {
  start: "<h1>",
  end: "</h1>",
  wraps: false,
});
markdownMap.set("## ", {
  start: "<h2>",
  end: "</h2>",
  wraps: false,
});
markdownMap.set("### ", {
  start: "<h3>",
  end: "</h3>",
  wraps: false,
});
markdownMap.set("- ", {
  start: "<li>",
  end: "<li>",
  wraps: false,
});
markdownMap.set("* ", {
  start: "<b>",
  end: "</b>",
  wraps: true,
});
markdownMap.set("** ", {
  start: "<i>",
  end: "</i>",
  wraps: true,
});
markdownMap.set("*** ", {
  start: "<b><i>",
  end: "</b></i>",
  wraps: true,
});
markdownMap.set("1. ", {
  start: "<li>",
  end: "</li>",
  wraps: false,
});
markdownMap.set("``` ", {
  start: "<code>",
  end: "</code>",
  wraps: true,
});

const initialize = () => {
  console.log("Connected");

  const markdown = document.getElementById("markdown");
  const preview = document.getElementById("preview");

  if (!markdown || !preview) {
    throw new Error("Check HTML for markdown and preview divs");
  }

  // Fetch initial value, parse it, render html in preview
  const value = markdown.value;
  const htmlOutput = parse(value);
  preview.innerHTML = htmlOutput;

  markdown.addEventListener("input", (e) => handleMarkdown(e, preview));
};

const handleMarkdown = (e, preview) => {
  const value = e.target.value;
  const htmlOutput = parse(value);

  preview.innerHTML = htmlOutput;
};

window.addEventListener("load", initialize);
