import React, { useEffect, useState } from "react";

import CartIcon from "../assets/svg/cart.svg";
import { Product } from "../app/slices/catalogSlice";

interface MainCardProps extends Product {
    handleClick: (id: string) => void;
}

const MainCard: React.FC<MainCardProps> = ({
    name,
    price,
    // season,
    type_,
    brand,
    // preview,
    uid,
    web_data,
    sizes,
    handleClick,
}) => {
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const photo = `${
            import.meta.env.VITE_API_URL
        }get_product_photo?product_uid=${uid}&product_type=${type_}&product_brand=${brand}&product_photo_num=${0}`;

        setPhoto(photo);
    }, []);

    return (
        <div
            className="bg-light-color-15 rounded-[20px] flex flex-col"
            onClick={() => handleClick(uid)}
        >
            <div
                className="bg-light-color border-primary-color border-b-2 border-r-2
                    flex items-center justify-center rounded-[15px] w-full h-[155px] overflow-hidden"
            >
                <img src={photo} alt={name} className="object-cover h-full w-full" />
            </div>
            <h3 className="mx-0.5 my-2 text-light-color font-semibold text-xs overflow-auto text-nowrap no-scroll">
                {name}
            </h3>
            <div className="flex flex-col items-start gap-px">
                {web_data.map((data) => {
                    if (data.incatalog) {
                        return (
                            <span
                                key={`${data.value}-${data.name}`}
                                className="mx-0.5 font-inter text-xs text-light-color-60"
                            >
                                {data.name} {data.value}
                            </span>
                        );
                    }
                })}
            </div>
            <div className="relative mt-auto">
                <span className="absolute right-0.5 -top-3.5 text-right text-primary-color font-semibold text-[10px]">
                    {price} ₽
                </span>
                <button
                    className={`flex items-center justify-center gap-1 w-full py-2 mt-[5px]
                    text-light-color font-semibold text-[10px] rounded-md ${
                        sizes && sizes.length === 0
                            ? "bg-light-color-60"
                            : "bg-primary-color"
                    }
                    `}
                    disabled={sizes && sizes.length === 0}
                >
                    Заказать
                    <img src={CartIcon} alt="cart" />
                </button>
            </div>
        </div>
    );
};

export default MainCard;
