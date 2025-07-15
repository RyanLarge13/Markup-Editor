const markupMap = new Map();
const markUpArrChecker = ["#", "-", "*", "1.", "`"];

markupMap.set("#", {
  code: "#",
  start: "<h1>",
  end: "</h1>",
  wraps: false,
  last: false,
});
markupMap.set("##", {
  code: "##",
  start: "<h2>",
  end: "</h2>",
  wraps: false,
  last: false,
});
markupMap.set("###", {
  code: "###",
  start: "<h3>",
  end: "</h3>",
  wraps: false,
  last: true,
});
markupMap.set("-", {
  code: "-",
  start: "<li>",
  end: "<li>",
  wraps: false,
  last: true,
});
markupMap.set("*", {
  code: "*",
  start: "<b>",
  end: "</b>",
  wraps: true,
  last: false,
});
markupMap.set("**", {
  code: "**",
  start: "<i>",
  end: "</i>",
  wraps: true,
  last: false,
});
markupMap.set("***", {
  code: "***",
  start: "<b><i>",
  end: "</b></i>",
  wraps: true,
  last: true,
});
markupMap.set("1.", {
  code: "1.",
  start: "<li>",
  end: "</li>",
  wraps: false,
  last: true,
});
markupMap.set("```", {
  code: "```",
  start: "<code>",
  end: "</code>",
  wraps: true,
  last: true,
});

const findMarkup = (c) => {
  if (markUpArrChecker.includes(c)) {
    return c;
  } else {
    return null;
  }
};

const checkMarks = (marks) => {
  if (marks.length === 0) {
    return null;
  }
  if (marks.length > 1) {
    const mark = marks.reduce((a, b) => a + b);
    if (markupMap.has(mark)) {
      return markupMap.get(mark);
    } else {
      return null;
    }
  } else {
    if (markupMap.has(marks[0])) {
      return markupMap.get(marks[0]);
    } else {
      return null;
    }
  }
};

export const parse = (text) => {
  const chars = text.split("");

  let marks = [];
  let prevMarks = [];
  let open = false;

  const newHTML = chars.map((c) => {
    const mark = findMarkup(c);

    if (mark) {
      console.log("push");
      marks.push(mark);
      return " ";
    }

    // Final mark represents the full mark that has been parsed incase of multi character marks
    const finalMark = checkMarks(marks);

    if (c === "\n") {
      if (finalMark) {
        if (finalMark.wraps) {
          return "<br />";
        } else {
          open = false;
          marks = [];
          return finalMark.end + "<br />";
        }
      } else {
        if (
          prevMarks[prevMarks.length - 1] &&
          !prevMarks[prevMarks.length - 1]?.wraps
        ) {
          open = false;
          marks = [];
          return prevMarks[prevMarks.length - 1].end + "<br />";
        } else {
          return "<br />";
        }
      }
    }

    if (!finalMark) {
      marks = [];
      return c;
    }

    if (!open) {
      open = true;
      marks = [];
      prevMarks.push(finalMark);
      return finalMark.start;
    }

    marks = [];

    if (finalMark?.code !== prevMarks[prevMarks.length - 1]?.code) {
      prevMarks.push(finalMark);
      return finalMark.start;
    } else {
      prevMarks.pop(finalMark);

      if (prevMarks.length < 1) {
        open = false;
      }
      return finalMark.end;
    }
  });

  if (newHTML.length > 0) {
    const html = newHTML.reduce((a, b) => a + b);
    console.log(html);
    return html;
  } else {
    return "";
  }
};
