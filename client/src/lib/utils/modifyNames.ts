const modifyNames = (namesObj: {string: string}) => {
    return Object.entries(namesObj).map(([abw, name]) => ({
        abw,
        name
    }))
};

export default modifyNames;