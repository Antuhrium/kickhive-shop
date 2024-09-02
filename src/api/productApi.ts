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
        description: string;
        season: string;
        type_: string;
    };
}

export const getStylesCatalog = async (
    product_uid: string
): Promise<stylesCatalogType[]> => {
    const res = await axios.get("/get_styles_catalog", {
        params: {
            product_uid,
        },
    });
    return res.data.result;
};