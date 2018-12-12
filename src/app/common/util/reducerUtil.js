export const createReducer = (initialiState, fnMap) => {
    return (state = initialiState, {type, payload}) => {
        const hanlder = fnMap[type];

        return hanlder ? hanlder(state, payload): state
    }
}