import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";

import CartIcon from "../assets/svg/cart.svg";
import { Product } from "../app/slices/catalogSlice";
import { CartItem } from "../app/slices/cartSlice";

interface ModalCardProps extends Product {
    handleClick: ({ uid, price, quantity, size, color }: CartItem) => void;
    setModalCard: React.Dispatch<React.SetStateAction<string>>
}

const ModalCard: React.FC<ModalCardProps> = ({
    name,
    price,
    season,
    type_,
    uid,
    brand,
    photos,
    preview,
    style,
    handleClick,
    setModalCard
}) => {
    const [color, setColor] = useState<number>(1);
    const [size, setSize] = useState<number>(1);

    const colors = ["Синий", "Красный", "Белый", "Черный", "Фиол."];
    const changeColorClick = (index: number) => {
        setColor(index);
    };

    const sizes = [
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 35",
        "EU 41",
    ];
    const changeSizeClick = (index: number) => {
        setSize(index);
    };

    return (
        <>
            <div className="fixed z-20 backdrop-blur-sm inset-0 bg-dark-color-10" onClick={() => setModalCard("")} />
            <div className="fixed z-30 inset-x-[25px] top-1/2 -translate-y-1/2">
                <div className="relative -mb-3">
                    <Swiper
                        className="h-[150px]"
                        spaceBetween={10}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                            renderBullet: function (className) {
                                return `<span class="${className} custom-bullet"></span>`;
                            },
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <SwiperSlide
                                key={i}
                                className="bg-light-color rounded-[15px] border-b-2 border-primary-color max-h-[155px]"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {/* <img src={image} alt={name} /> */}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="bg-dark-color-85 backdrop-blur-[10px] border border-primary-color px-[15px] pb-4 rounded-b-[20px]">
                    <h2 className="text-xs font-semibold text-light-color mt-10">
                        {name}
                    </h2>
                    <div className="mt-3">
                        <span className="text-[11px] text-light-color font-normal">
                            Расцветка:
                        </span>
                        <div className="mt-[5px] flex items-center gap-1 flex-wrap">
                            {colors.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeColorClick(index)}
                                    className={`min-w-[55px] min-h-[20px] flex items-center justify-center rounded-md
                                    text-[8px] leading-[10px] text-center font-normal ${
                                        color === index
                                            ? "bg-primary-color text-light-color"
                                            : "bg-light-color-60 text-light-color-60"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className="text-[11px] text-light-color font-normal">
                            Размеры:
                        </span>
                        <div className="mt-[5px] flex items-center gap-1 flex-wrap">
                            {sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeSizeClick(index)}
                                    className={`min-w-[55px] min-h-[20px] flex items-center justify-center rounded-md
                                    text-[8px] leading-[10px] text-center font-normal ${
                                        size === index
                                            ? "bg-primary-color text-light-color"
                                            : "bg-light-color-60 text-light-color-60"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className="text-[11px] text-light-color font-normal">
                            Описание
                        </span>
                        <div className="font-inter text-xs font-normal text-light-color-60">
                            Тип: {type_}
                        </div>
                        <div className="font-inter text-xs font-normal text-light-color-60">
                            Сезон: {season}
                        </div>
                        <div className="font-inter text-xs font-normal text-light-color-60">
                            Стиль: {style}
                        </div>
                        <div className="font-inter text-xs font-normal text-light-color-60">
                            Высота каблука: Высокий каблук (5-8см)
                        </div>
                        <div className="font-inter text-xs font-normal text-light-color-60">
                            Материал: Микрофибра
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] text-light-color font-normal">
                                Стоимость:
                            </span>
                            <span className="text-primary-color text-[10px] font-semibold">
                                {price} ₽
                            </span>
                        </div>
                        <button
                            onClick={() => handleClick({uid, price, quantity: 1, color: colors[color], size: sizes[size]})}
                            className="max-w-[160px] flex items-center justify-center gap-1 w-full py-2 mt-[5px]
                            text-light-color font-semibold text-[10px] bg-primary-color rounded-md"
                        >
                            Заказать
                            <img src={CartIcon} alt="cart" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCard;
