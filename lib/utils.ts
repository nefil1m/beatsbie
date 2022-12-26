const times = (howMany = 1, what): ReturnType<typeof what> => [...new Array(howMany).fill(0).map(what)];

export { times };
