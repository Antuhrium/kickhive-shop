import React, { useEffect, useState } from "react";
import CartIcon from "../assets/svg/cart.svg";

import BackIcon from "../assets/svg/back.svg";
import SupChatIcon from "../assets/svg/support-chat.svg";

import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem } from "../api/cartApi";
import CartCard from "../components/CartCard";
import ModalDelivery from "../components/ModalDelivery";
import { useBackButton, useUtils } from "@telegram-apps/sdk-react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export interface cartProductsProps {
    [uid: string]: {
        preview: string;
        name: string;
        brand: string;
        type: string;
        style: string;
        price: number;
        size_data: {
            [size: string]: number;
        };
    };
}

const CartPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliver, setDeliver] = useState<0 | 1>(0);
    const [deliveryModal, setDeliveryModal] = useState(false);

    const [cartProducts, setCartProducts] = useState<cartProductsProps>({});

    const [currentPrice, setCurrentPrice] = useState<number | string>();

    const navigate = useNavigate();

    const backButton = useBackButton();

    useEffect(() => {
        backButton.show();
        backButton.on("click", () => {
            navigate(-1);
        });
    }, []);

    const handleDeliverChange = (index: 0 | 1) => {
        setDeliver(index);
        if (index === 1 && !deliveryModal) {
            setDeliveryModal(true);
        }
    };

    const fetchCartProducts = async (user_uid: string) => {
        try {
            const res = await getCart({ user_uid });
            setCartProducts(res);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchCartProducts("54");
    }, []);

    const uid = useSelector((state: RootState) => state.user.uid);
    console.log(uid);
    


    const handleDelete = async ({
        product_uid,
        user_uid,
    }: {
        product_uid: string;
        user_uid: string;
    }) => {
        await removeCartItem({ product_uid, user_uid });
        fetchCartProducts(user_uid);
    };

    useEffect(() => {
        if (cartProducts) {
            const totalSum = Object.values(cartProducts).reduce(
                (total, product) => {
                    const productTotal = Object.entries(
                        product.size_data
                    ).reduce((sum, [_, quantity]) => {
                        return sum + Number(product.price) * Number(quantity);
                    }, 0);
                    return total + productTotal;
                },
                0
            );
            setCurrentPrice(totalSum);
        }
    }, [cartProducts]);

    const utils = useUtils();

    return (
        <main className="w-screen px-[25px] relative pb-36">
            {deliveryModal && <ModalDelivery setModalCard={setDeliveryModal} />}

            <div className="h-[35px] bg-primary-color rounded-b-[15px] fixed z-10 top-0 inset-x-[25px]" />
            <div className="flex flex-wrap gap-3 mt-[70px]">
                {Object.entries(cartProducts).map(([uid, product]) => (
                    <CartCard
                        key={uid}
                        uid={uid}
                        {...product}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="fixed z-10 bottom-40 right-6 animate-fadeTopBtn">
                <button
                    className="menu-button"
                    onClick={() =>
                        utils.openTelegramLink(
                            "https://t.me/kickhivebot?start=thp"
                        )
                    }
                >
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
                    <span className="text-primary-color">{currentPrice} ₽</span>
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
