const makeClassName = (...args) => {
  let className = "";
  args.forEach((name) => {
    if (Boolean(name)) {
      className += ` ${name}`;
    }
  });
  return className;
};

export default makeClassName;
