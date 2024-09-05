import axios from "./axios";

interface getCatalogType {
    offset: number;
    limit: number;
    user_uid: string;
}

export const getCatalog = async ({
    offset,
    limit,
    user_uid,
}: getCatalogType) => {
    const res = await axios.get("/get_catalog", {
        params: {
            offset,
            limit,
            user_uid,
        },
    });
    return res.data.result;
};

export const getProduct = async (product_uid: string) => {
    const res = await axios.get("/get_product", {
        params: {
            product_uid,
        },
    });
    return res.data;
};

export interface stylesCatalogType {
    brand: string;
    name: string;
    photos: string;
    preview: string;
    price: string;
    season: string;
    sizes: {
        [key: string]: number;
    };
    style: string;
    type_: string;
    uid: string;
    web_data: {
        incard: boolean;
        incatalog: boolean;
        style?: boolean;
        name: string;
        value: string;
    }[];
}

interface getStylesCatalogTypes {
    product_uid: string;
    user_uid: string;
}

export const getStylesCatalog = async ({
    product_uid,
    user_uid,
}: getStylesCatalogTypes): Promise<stylesCatalogType[]> => {
    const res = await axios.get("/get_styles_catalog", {
        params: {
            product_uid,
            user_uid,
        },
    });
    return res.data.result;
};

export const getDelivery = async () => {
    const res = await axios.get("/get_delivery");
    return res.data;
};
