import axios from "./axios";

export const getCatalog = async ({ offset = 0, limit = 50 }) => {
    const res = await axios.get("/get_catalog", {
        params: {
            offset,
            limit,
        },
    });
    return res.data.result;
};

