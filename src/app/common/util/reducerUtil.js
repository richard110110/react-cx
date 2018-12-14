export const createReducer = (initialState, fnMap) => {
    return (state = initialState, {type, payload}) => {
        const hanlder = fnMap[type];

        return hanlder ? hanlder(state, payload): state
    }
}