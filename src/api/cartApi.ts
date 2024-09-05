import axios from "./axios";

export const getCart = async (user_uid: string) => {
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
    user_uid,
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

interface registerCart {
    user_uid: string;
    delivery_type: "home" | "point";
    phone: string;
    pay_amount: number;
}

export const registerCart = async ({
    user_uid,
    delivery_type,
    phone,
    pay_amount,
}: registerCart) => {
    const res = await axios.post("/register_can", null, {
        params: {
            user_uid,
            delivery_type,
            phone,
            pay_amount,
        },
    });
    return res.data;
};

export const getDeliveryInfo = async () => {
    const res = await axios.get("/get_delivery_info");
    return res.data;
};
