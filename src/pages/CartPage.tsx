import React, { useEffect, useState } from "react";
import CartIcon from "../assets/svg/cart.svg";

import BackIcon from "../assets/svg/back.svg";
import SupChatIcon from "../assets/svg/support-chat.svg";

import { useNavigate } from "react-router-dom";
import { getCart, registerCart, removeCartItem } from "../api/cartApi";
import CartCard from "../components/CartCard";
import ModalDelivery from "../components/ModalDelivery";
import { useBackButton, useUtils } from "@telegram-apps/sdk-react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ModalDeliveryInfo from "../components/ModalDeliveryInfo";

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

    const [delivery, setDeliver] = useState<"home" | "point">("home");
    const [deliveryModal, setDeliveryModal] = useState(false);
    const [deliveryInfoModal, setDeliveryInfoModal] = useState(false);

    const [cartProducts, setCartProducts] = useState<cartProductsProps>({});

    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [validPhone, setValidPhone] = useState(true);

    const navigate = useNavigate();
    const backButton = useBackButton();

    const user_uid = useSelector((state: RootState) => state.user.uid);

    useEffect(() => {
        backButton.show();
        backButton.on("click", () => {
            navigate(-1);
        });
    }, []);

    const fetchCartProducts = async () => {
        try {
            const res = await getCart(user_uid);
            setCartProducts(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCartProducts();
    }, []);

    const handleDelete = async ({ product_uid }: { product_uid: string }) => {
        await removeCartItem({ product_uid, user_uid });
        fetchCartProducts();
    };

    const handleDeliverChange = (name: "home" | "point") => {
        setDeliver(name);
        if (name === "point" && !deliveryModal) {
            setDeliveryModal(true);
        }
    };

    function validatePhoneNumber(phoneNumber: string) {
        const pattern =
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;

        return pattern.test(phoneNumber);
    }

    const handleOrder = async () => {
        if (validatePhoneNumber(phoneNumber)) {
            try {
                await registerCart({
                    user_uid,
                    delivery_type: delivery,
                    phone: phoneNumber,
                    pay_amount: currentPrice,
                });
                fetchCartProducts();
            } catch (err) {
                console.log(err);
            } finally {
                setDeliveryInfoModal(true);
                setPhoneNumber("");
            }
        } else {
            setPhoneNumber("");
            setValidPhone(false);
        }
    };

    const phoneChange = (el: string) => {
        setPhoneNumber(el);
        setValidPhone(true);
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
            {deliveryInfoModal && (
                <ModalDeliveryInfo onClose={setDeliveryInfoModal} />
            )}

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
                        className={`bg-light-color-15 p-1 rounded-[5px] font-inter text-[8px] leading-[8xp] w-[49%] outline-none text-light-color
                            ${
                                validPhone
                                    ? "placeholder:text-light-color-60"
                                    : "placeholder:text-red-400"
                            }`}
                            
                        placeholder={
                            validPhone
                                ? "Введите номер телефона"
                                : "Введите правильный номер телефона"
                        }
                        onChange={(e) => phoneChange(e.target.value)}
                        value={phoneNumber}
                    />
                </div>
                <div className="flex gap-2 mt-[10px]">
                    <div className="flex flex-col gap-[5px] w-full">
                        <button
                            onClick={() => handleDeliverChange("home")}
                            className={`${
                                delivery === "home"
                                    ? "bg-primary-color text-light-color"
                                    : "bg-light-color-15 text-light-color-60"
                            }
                            flex items-center justify-center w-full p-[5px] rounded-[5px] font-inter text-[8px] text-center leading-[9px]`}
                        >
                            Доставка до адреса
                        </button>
                        <button
                            onClick={() => handleDeliverChange("point")}
                            className={`${
                                delivery === "point"
                                    ? "bg-primary-color text-light-color"
                                    : "bg-light-color-15 text-light-color-60"
                            }
                        flex items-center justify-center w-full p-[5px] rounded-[5px] font-inter text-[8px] text-center leading-[9px]`}
                        >
                            Забрать на месте выдачи
                        </button>
                    </div>
                    <button
                        className={`min-h-full w-full flex items-center gap-[5px] justify-center
                        rounded-[5px] text-[10px] font-semibold text-light-color ${
                            phoneNumber.length === 0 ||
                            Object.keys(cartProducts).length === 0
                                ? "bg-light-color-60"
                                : "bg-primary-color"
                        }`}
                        disabled={
                            phoneNumber.length === 0 ||
                            Object.keys(cartProducts).length === 0
                        }
                        onClick={handleOrder}
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
