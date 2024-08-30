import React from "react";

import CartIcon from "../assets/svg/cart.svg";

interface MainCardProps {
    id: number;
    image: string;
    name: string;
    price: number;
    type: string;
    season: string;
    handleClick: (id: number) => void;
}

const MainCard: React.FC<MainCardProps> = ({
    id,
    image,
    name,
    type,
    season,
    price,
    handleClick,
}) => {
    return (
        <div className="bg-light-color-15 rounded-[20px]">
            <div
                className="bg-light-color border-primary-color border-b-2 border-r-2
                    flex items-center justify-center rounded-[15px] w-full h-[155px]"
            >
                <img src={image} alt={name} />
            </div>
            <h3 className="mx-0.5 mt-2 text-light-color font-semibold text-xs overflow-auto text-nowrap no-scroll">
                {name}
            </h3>
            <span className="mx-0.5 font-inter text-xs text-light-color-60 mt-1">
                Тип: {type}
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
                onClick={() => handleClick(id)}
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
