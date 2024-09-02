import React, { useEffect, useState } from "react";

import CartIcon from "../assets/svg/cart.svg";
import { Product } from "../app/slices/catalogSlice";

interface MainCardProps extends Product {
    handleClick: (id: string) => void;
}

const MainCard: React.FC<MainCardProps> = ({
    name,
    price,
    season,
    type_,
    brand,
    // preview,
    uid,
    handleClick,
}) => {
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const photo = `${
            import.meta.env.VITE_API_URL
        }/get_product_photo?product_uid=${uid}&product_type=${type_}&product_brand=${brand}&product_photo_num=${0}`;

        setPhoto(photo);
    }, []);

    return (
        <div className="bg-light-color-15 rounded-[20px] flex flex-col justify-between">
            <div
                className="bg-light-color border-primary-color border-b-2 border-r-2
                    flex items-center justify-center rounded-[15px] w-full h-[155px] overflow-hidden"
            >
                <img src={photo} alt={name} />
            </div>
            <h3 className="mx-0.5 mt-2 text-light-color font-semibold text-xs overflow-auto text-nowrap no-scroll">
                {name}
            </h3>
            <span className="mx-0.5 font-inter text-xs text-light-color-60 mt-1">
                Тип: {type_}
            </span>
            <div className="px-0.5 flex items-center justify-between">
                <span className="font-inter text-xs text-light-color-60">
                    Сезон: {season}
                </span>
                <span className="text-primary-color font-semibold text-[10px]">
                    {price} ₽
                </span>
            </div>
            <button
                onClick={() => handleClick(uid)}
                className="flex items-center justify-center gap-1 w-full py-2 mt-[5px]
                    text-light-color font-semibold text-[10px] bg-primary-color rounded-md"
            >
                Заказать
                <img src={CartIcon} alt="cart" />
            </button>
        </div>
    );
};

export default MainCard;
