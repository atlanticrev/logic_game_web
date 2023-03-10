const randIndex = <T>(arr: T[]) => {
    return Math.trunc(Math.random() * (arr.length + 1));
};

export { randIndex };
