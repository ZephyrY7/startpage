import commands from "./commands.js";
import executors from "./executors.js";
import { error, render } from "./helpers.js";
import shortcuts from "./shortcuts.js";

const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const userInput = input.value.trim().split(" ");
    const command = userInput[0].toLowerCase();
    const options = userInput.slice(1);
    // Render the user input with a red prompt
    render(`<span class="red">$&nbsp;</span>${input.value}`);
    try {
      // Find the command details based on the entered command
      const commandDetails = commands.find((c) =>
        c.name.map((n) => n.toLowerCase()).includes(command)
      );
      if (commandDetails) {
        // If the command is found, execute the corresponding function
        if (command === "help" || command === "h")
          commandDetails.execute(commands);
        else commandDetails.execute(options);
      } else {
        // If the command is not found, check if it matches a shortcut
        const shortcutDetails = shortcuts
          .flatMap((c) => Object.entries(c.items))
          .find(([name]) => name.toLowerCase().startsWith(command));
        if (shortcutDetails) {
          // If a shortcut is found, log and redirect
          console.log(shortcutDetails);
          render(`Redirecting to ${shortcutDetails[0]}...`);
          window.location.href = shortcutDetails[1];
        } else {
          // If neither command nor shortcut is found, show an error
          error("yellow", command, "command not found");
        }
      }
    } catch (e) {
      // Catch and display JavaScript errors
      error("red", "JS Error", e.message);
    }
    // Clear the input value after processing
    input.value = "";
  }
});

window.addEventListener("load", () => {
  executors.ls();
  let filenames = ["evening-sky.png"];
  let root = document.getElementsByTagName("html")[0];
  root.style.backgroundImage = `url("./backgrounds/${
    filenames[Math.floor(Math.random() * filenames.length)]
  }")`;
  root.style.backgroundSize = "cover";
  root.style.backgroundPosition = "center";
});
