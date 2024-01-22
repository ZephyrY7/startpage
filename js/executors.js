import { error, render } from "./helpers.js";
import shortcuts from "./shortcuts.js";

export default {
  search: (options) => {
    const query = options.join(" ") || null;
    if (query) {
      window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(
        query
      )}`;
    } else {
      render("No query, redirecting to DDG!");
      window.location.href = "https://duckduckgo.com";
    }
  },
  ls: () => {
    if (shortcuts) {
      let shortcutsOutput = '<div class="shortcuts-container">';
      shortcuts.forEach((s) => {
        shortcutsOutput += `<div class="shortcuts"><p class="bold ${s.color}">~/${s.category}</p>`;
        Object.entries(s.items).forEach(([name, link]) => {
          shortcutsOutput += `<p><span class="${s.color}">> </span><a class="shortcut" href="${link}">${name}</a></p>`;
        });
        shortcutsOutput += "</div>";
      });
      render(shortcutsOutput + "</div><br />");
    } else {
      error("yellow", "No Shortcuts");
    }
  },
  help: (cmdList) => {
    let padToLen = Math.max(...cmdList.map((c) => c.name.join("|").length));
    let helpMessage = "";
    cmdList.forEach((c) => {
      let paddedCommand = c.name
        .join("|")
        .padEnd(padToLen, " ")
        .replaceAll(" ", "&nbsp;");
      helpMessage += `<p><span class="cyan">${paddedCommand}</span>&nbsp;&nbsp;&nbsp;&nbsp;${c.description}</p>`;
    });
    render(helpMessage, false);
  },
  clear: () => {
    output.innerHTML = "";
    input.focus();
  },
};
