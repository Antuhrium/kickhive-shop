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

// get_product_photo?product_uid=1zcB0Wd667Pab&product_type=sneakers&product_brand=Nike&product_photo_num=0
// https://kickhive.shop/api/get_product_photo?product_uid=1zcB0Wd667Pab&product_type=sneakers&product_brand=Nike&product_photo_num=0
export interface ProductPhotoType {
    product_uid: string;
    product_type: string;
    product_brand: string;
    product_photo_num: number;
}

export const getProductPhoto = async ({
    product_uid,
    product_type,
    product_brand,
    product_photo_num,
}: ProductPhotoType) => {
    const res = await axios.get("/get_product_photo", {
        params: {
            product_uid,
            product_type,
            product_brand,
            product_photo_num,
        },
    });
    console.log(res)
    return res.data;
};
