import axios from "./axios";

export const getUser = async (user_id: number) => {
    const res = await axios.get("/get_user", {
        params: {
            user_id,
        },
    });
    return res.data;
};