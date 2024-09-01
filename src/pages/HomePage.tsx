import React, { useEffect, useState } from "react";
import MainCard from "../components/MainCard";

import SupChatIcon from "../assets/svg/support-chat.svg";
import CartIcon from "../assets/svg/green-cart.svg";
import ModalMessage from "../components/ModalMessage";
import ModalCard from "../components/ModalCard";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getCatalog, getStylesCatalog } from "../api/productApi";
import { setProducts } from "../app/slices/catalogSlice";
import { CartItem, addItem } from "../app/slices/cartSlice";

const HomePage: React.FC = () => {
    const [modalCard, setModalCard] = useState<string>("");
    const [notification, setNotification] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.catalog.products);

    const addToCart = ({ uid, price, quantity, color, size }: CartItem) => {
        setNotification("Товар добавлен в корзину!");
        setModalCard("");
        dispatch(
            addItem({
                uid,
                price,
                quantity,
                color,
                size,
            })
        );
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
            if (products.length === 0) {
                setLoading(true);
                try {
                    const catalogData = await getCatalog({
                        offset: 0,
                        limit: 50,
                    });
                    dispatch(setProducts(catalogData));
                } catch (error) {
                    console.error("Error fetching catalog:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCatalog();
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
                    <MainCard
                        key={index}
                        {...item}
                        handleClick={handleClick}
                    />
                ))}
            </div>
            <div className="animate-fadeBottomBtn fixed z-10 bottom-8 right-6">
                <button className="menu-button">
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
