import React, { useEffect, useState } from "react";
import MainCard from "../components/MainCard";

import SupChatIcon from "../assets/svg/support-chat.svg";
import CartIcon from "../assets/svg/green-cart.svg";
import ModalMessage from "../components/ModalMessage";
import ModalCard from "../components/ModalCard";
import { Link } from "react-router-dom";
import { getCatalog } from "../api/productApi";

const shoeList = [
    {
        id: 1,
        image: "/shoe-img.png",
        name: "Nike DUNK LOW",
        price: 9999,
        type: "Кроссовки",
        season: "Любой",
    },
    {
        id: 2,
        image: "/shoe-img.png",
        name: "Nike Dunk SB Low Pro Dunk SB Low Pro",
        price: 19999,
        type: "Кроссовки",
        season: "Любой",
    },
    {
        id: 3,
        image: "/shoe-img.png",
        name: "Nike DUNK LOW",
        price: 15999,
        type: "Кроссовки",
        season: "Любой",
    },
    {
        id: 4,
        image: "/shoe-img.png",
        name: "Nike DUNK LOW",
        price: 9999,
        type: "Кроссовки",
        season: "Любой",
    },
    {
        id: 5,
        image: "/shoe-img.png",
        name: "Nike Dunk SB Low Pro",
        price: 19999,
        type: "Кроссовки",
        season: "Любой",
    },
    {
        id: 6,
        image: "/shoe-img.png",
        name: "Nike DUNK LOW",
        price: 15999,
        type: "Кроссовки",
        season: "Любой",
    },
];

const HomePage: React.FC = () => {
    const [modalCard, setModalCard] = useState<number | null>(null);
    const [notification, setNotification] = useState("");
    const [products, setProducts] = useState([]);

    const addToCart = () => {
        setNotification("Товар добавлен в корзину!");
        setModalCard(null);
    };

    const handleClick = (id: number) => {
        if (modalCard === id) {
            setModalCard(null);
        } else {
            setModalCard(id);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setNotification(""), 1500);
        return () => clearTimeout(timer);
    }, [notification]);

    // useEffect(() => {
    //     const fetchCatalog = async () => {
    //         try {
    //             const catalogData = await getCatalog({ limit: 50 });
    //             setProducts(catalogData);
    //             console.log(catalogData);
    //         } catch (error) {
    //             console.error("Error fetching catalog:", error);
    //         }
    //     };

    //     fetchCatalog();
    // }, []);

    return (
        <main className="w-screen px-[25px] relative pb-36">
            {modalCard ? (
                <ModalCard
                    {...shoeList.filter((item) => item.id === 1)[0]}
                    handleClick={addToCart}
                    setModalCard={setModalCard}
                />
            ) : null} 
            {notification && (
                <div className="animate-appear fixed z-10 top-12 inset-x-[25px]">
                    <ModalMessage title={notification} />
                </div>
            )}

            <div className="    h-[35px] bg-primary-color rounded-b-[15px] fixed top-0 inset-x-[25px]" />
            <div className="mt-[60px] grid grid-cols-2 gap-3 overflow-auto">
                {shoeList.map((item) => (
                    <MainCard
                        key={item.id}
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
