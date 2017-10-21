export const queryStringToMap = queryString => {
    const pairs = queryString
        .substr(1)
        .split('&')
        .map(nameValue => nameValue.split('='));
    return new Map(pairs);
};
