const render = (text, needsMarkup = true) => {
  if (needsMarkup) {
    output.innerHTML += `<p>${text}</p>`;
  } else {
    output.innerHTML += text;
  }
  input.focus();
};

const error = (color, type, message) => {
  render(`<p><span class="${color}">${type}</span>: ${message}</p>`);
};

export { render, error };
