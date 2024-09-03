import axios from "./axios";

export const getUser = async (user_id: number) => {
    const res = await axios.get("/get_user", {
        params: {
            user_id,
        },
    });
    return res.data;
};

export const registerUser = async (user_uid: string) => {
    const res = await axios.post("/register_can", null, {
        params: {
            user_uid,
        },
    });
    return res.data;
};
