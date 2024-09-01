import React, { useState } from "react";
import CartIcon from "../assets/svg/cart.svg";

import BackIcon from "../assets/svg/back.svg";
import SupChatIcon from "../assets/svg/support-chat.svg";

import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const CartPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliver, setDeliver] = useState<0 | 1>(0);

    const navigate = useNavigate();

    const handleDeliverChange = (index: 0 | 1) => {
        setDeliver(index);
    };

    const cartProducts = useSelector((state: RootState) => state.cart.items);

    let price = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        price += cartProducts[i].price;
    }

    return (
        <main className="w-screen px-[25px] relative pb-36">
            <div className="h-[35px] bg-primary-color rounded-b-[15px] fixed z-10 top-0 inset-x-[25px]" />
            <div className="flex flex-wrap gap-3 mt-[70px]">
                {cartProducts.map((item, index) => (
                    <CartCard key={index} {...item} />
                ))}
            </div>
            <div className="fixed z-10 bottom-40 right-6 animate-fadeTopBtn">
                <button className="menu-button">
                    <img
                        src={SupChatIcon}
                        alt="Support chat"
                        className="w-6 h-6"
                    />
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-[10px] menu-button"
                >
                    <img src={BackIcon} alt="Back" className="w-6 h-6" />
                </button>
            </div>
            <div className="animate-fadeTop fixed bottom-0 inset-x-[25px] bg-[#262626] rounded-t-2xl px-[15px] py-5 border-2 border-primary-color border-b-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-light-color">
                    К Оплате:{" "}
                    <span className="text-primary-color">{price} ₽</span>
                </div>
                <div className="mt-[7px] flex items-center justify-between gap-2 text-[11px] font-normal text-light-color leading-3 text-nowrap">
                    Контакт для связи:
                    <input
                        type="tel"
                        className="bg-light-color-15 p-1 rounded-[5px] font-inter text-[8px] leading-[8xp] w-[49%] outline-none text-light-color placeholder:text-light-color-60"
                        placeholder="Введите номер телефона"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                    />
                </div>
                <div className="flex gap-2 mt-[10px]">
                    <div className="flex flex-col gap-[5px] w-full">
                        <button
                            onClick={() => handleDeliverChange(0)}
                            className={`${
                                deliver === 0
                                    ? "bg-primary-color text-light-color"
                                    : "bg-light-color-15 text-light-color-60"
                            }
                            flex items-center justify-center w-full p-[5px] rounded-[5px] font-inter text-[8px] text-center leading-[9px]`}
                        >
                            Доставка до адреса
                        </button>
                        <button
                            onClick={() => handleDeliverChange(1)}
                            className={`${
                                deliver === 1
                                    ? "bg-primary-color text-light-color"
                                    : "bg-light-color-15 text-light-color-60"
                            }
                        flex items-center justify-center w-full p-[5px] rounded-[5px] font-inter text-[8px] text-center leading-[9px]`}
                        >
                            Забрать на месте выдачи
                        </button>
                    </div>
                    <button
                        className="min-h-full w-full flex items-center gap-[5px] justify-center
                        bg-primary-color rounded-[5px] text-[10px] font-semibold text-light-color"
                    >
                        Оформить
                        <img src={CartIcon} alt="cart" />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
