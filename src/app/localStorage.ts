export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("cart", serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("cart");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};
