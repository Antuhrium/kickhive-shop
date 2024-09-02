import axios from "./axios";

export const getCart = async ({ user_uid = "54" }) => {
    const res = await axios.get("/get_can", {
        params: {
            user_uid,
        },
    });
    return res.data;
};

export interface removeCartItemProps {
    user_uid: string;
    product_uid: string;
}

export const removeCartItem = async ({
    user_uid = "54",
    product_uid,
}: removeCartItemProps) => {
    const res = await axios.post("/remove_can", null, {
        params: {
            user_uid,
            product_uid,
        },
    });
    return res.data;
};

export interface addCartItemProps {
    user_uid: string;
    product_uid: string;
    size: string;
}

export const addCartItem = async ({
    user_uid,
    product_uid,
    size,
}: addCartItemProps) => {
    const res = await axios.post("/add_can", null, {
        params: {
            user_uid,
            product_uid,
            size,
        },
    });
    return res.data;
};
