import React, { useEffect, useState } from "react";
import MainCard from "../components/MainCard";

import SupChatIcon from "../assets/svg/support-chat.svg";
import CartIcon from "../assets/svg/green-cart.svg";
import ModalMessage from "../components/ModalMessage";
import ModalCard from "../components/ModalCard";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getCatalog } from "../api/productApi";
import { setProducts } from "../app/slices/catalogSlice";
import { addCartItem } from "../api/cartApi";
import { initUtils, useBackButton } from "@telegram-apps/sdk-react";

const HomePage: React.FC = () => {
    const [modalCard, setModalCard] = useState<string>("");
    const [notification, setNotification] = useState("");

    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.catalog.products);
    const user_uid = useSelector((state: RootState) => state.user.uid);

    const addToCart = async ({ uid, size }: { uid: string; size: string }) => {
        await addCartItem({ user_uid, product_uid: uid, size: size });
        setModalCard("");
        setNotification("Товар добавлен в корзину!");
    };

    const handleClick = (uid: string) => {
        if (modalCard === uid) {
            setModalCard("");
        } else {
            setModalCard(uid);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setNotification(""), 1500);
        return () => clearTimeout(timer);
    }, [notification]);

    useEffect(() => {
        const fetchCatalog = async () => {
            if (products.length === 0 && user_uid) {
                // setLoading(true);
                try {
                    const catalogData = await getCatalog({
                        offset: 0,
                        limit: 50,
                        user_uid,
                    });
                    dispatch(setProducts(catalogData));
                } catch (error) {
                    console.error("Error fetching catalog:", error);
                } finally {
                    // setLoading(false);
                }
            }
        };
        fetchCatalog();
    }, [user_uid]);

    const backButton = useBackButton();
    const utils = initUtils();

    useEffect(() => {
        backButton.hide();
    }, []);

    return (
        <main className="w-screen px-[25px] relative pb-36">
            {modalCard ? (
                <ModalCard
                    {...products.filter((item) => item.uid === modalCard)[0]}
                    handleClick={addToCart}
                    setModalCard={setModalCard}
                />
            ) : null}
            {notification && (
                <div className="animate-appear fixed z-10 top-12 inset-x-[25px]">
                    <ModalMessage title={notification} />
                </div>
            )}

            <div className="h-[35px] bg-primary-color rounded-b-[15px] fixed top-0 inset-x-[25px]" />
            <div className="mt-[60px] grid grid-cols-2 gap-3 overflow-auto">
                {products.map((item, index) => (
                    <MainCard key={index} {...item} handleClick={handleClick} />
                ))}
            </div>
            <div className="animate-fadeBottomBtn fixed z-10 bottom-8 right-6">
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
                <Link to="/cart" className="mt-[10px] menu-button">
                    <img
                        src={CartIcon}
                        alt="Shopping Cart"
                        className="w-6 h-6"
                    />
                </Link>
            </div>
        </main>
    );
};

export default HomePage;
