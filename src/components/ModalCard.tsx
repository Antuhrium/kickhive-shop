import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";

import CartIcon from "../assets/svg/cart.svg";
import { Product } from "../app/slices/catalogSlice";
import { getStylesCatalog, stylesCatalogType } from "../api/productApi";

import Loader from "../assets/svg/tube-spinner.svg";

interface ModalCardProps extends Product {
    handleClick: ({ uid, size }: { uid: string; size: string }) => void;
    setModalCard: React.Dispatch<React.SetStateAction<string>>;
}

const ModalCard: React.FC<ModalCardProps> = ({
    name,
    price,
    type_,
    uid,
    brand,
    photos,
    handleClick,
    setModalCard,
}) => {
    const [stylesCatalog, setStylesCatalog] = useState<stylesCatalogType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStylesCatalog = async () => {
            try {
                setLoading(true);
                const styles = await getStylesCatalog(uid);
                setStylesCatalog(styles);
            } catch (error) {
                console.error("Error fetching catalog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStylesCatalog();
    }, []);

    const [indexStyleCatalog, setIndexStyleCatalog] = useState<number>(0);
    const [photoLinks, setPhotosLinks] = useState<string[]>([]);

    const [currentUid, setCurrentUid] = useState<string>(uid);
    // const [currentStyle, setCurrentStyle] = useState<string>(style);

    const [color, setColor] = useState("");
    const [size, setSize] = useState<string>("");

    const [sizeList, setSizeList] = useState<string[]>([]);
    const [colorList, setColorList] = useState<
        { name: string; value: string }[]
    >([]);

    const changeColorClick = (color: string) => {
        setColor(color);
    };

    const changeSizeClick = (size: string) => {
        setSize(size);
    };

    useEffect(() => {
        const style = stylesCatalog[0]?.sizes;
        if (style && sizeList.length === 0) {
            Object.entries(style).forEach(([key, value]) => {
                if (value !== 0) {
                    setSizeList((prev) => [...prev, key]);
                }
            });
        }

        stylesCatalog.forEach((style) => {
            style.web_data.forEach((item) => {
                const is = colorList.find((color) => {
                    return color.name === item.name;
                });

                if (item?.style && !is) {
                    setColorList((prev) => [
                        ...prev,
                        { name: item.name, value: item.value },
                    ]);
                }
            });
        });
    }, [stylesCatalog]);

    useEffect(() => {
        if (colorList[0]?.name) {
            setColor(colorList[0].name);
        }
    }, [colorList]);

    console.log(color, colorList);

    useEffect(() => {
        stylesCatalog.forEach((style, index) => {
            if (style.style === color) {
                setIndexStyleCatalog(index);
                setCurrentUid(style.uid);
                // setCurrentStyle(style.style);
            }
        });
    }, [color]);

    useEffect(() => {
        if (photoLinks.length > 0) {
            setPhotosLinks([]);
        }
        for (let i = 0; i <= photos - 1; i++) {
            const photo = `${
                import.meta.env.VITE_API_URL
            }get_product_photo?product_uid=${currentUid}&product_type=${type_}&product_brand=${brand}&product_photo_num=${i}`;

            setPhotosLinks((prev) => [...prev, photo]);
        }
        setSizeList([]);
        const style = stylesCatalog[indexStyleCatalog]?.sizes;
        if (style) {
            Object.entries(style).forEach(([key, value]) => {
                if (value !== 0) {
                    setSizeList((prev) => [...prev, key]);
                }
            });
        }
    }, [currentUid]);

    return (
        <>
            <div
                className="fixed z-20 backdrop-blur-sm inset-0 bg-dark-color-10"
                onClick={() => setModalCard("")}
            />
            <div className="fixed z-30 inset-x-[25px] top-1/2 -translate-y-1/2">
                <div className="relative -mb-3">
                    <Swiper
                        className="h-[150px]"
                        spaceBetween={0}
                        slidesPerView={1}
                        modules={[Pagination]}
                        loop={true}
                        pagination={{
                            el: ".custom-pagination",
                            clickable: true,
                        }}
                    >
                        {photoLinks?.map((i, index) => (
                            <SwiperSlide
                                key={index}
                                className="bg-light-color rounded-[15px] overflow-hidden border-b-2 border-primary-color max-h-[155px]"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img src={i} alt={""} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="bg-dark-color-85 backdrop-blur-[10px] border border-primary-color px-[15px] pb-4 rounded-b-[20px]">
                    <div className="custom-pagination mt-5 w-3 h-3 flex justify-center items-center"></div>
                    <h2 className="text-xs font-semibold text-light-color mt-[10px]">
                        {name}
                    </h2>
                    <div className="mt-3">
                        <span className="text-[11px] text-light-color font-normal">
                            Расцветка:
                        </span>
                        <div className="mt-[5px] flex items-center gap-1 flex-wrap">
                            {!loading ? (
                                colorList.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            changeColorClick(item.name)
                                        }
                                        className={`min-w-[55px] min-h-[20px] flex items-center justify-center rounded-md
                                    text-[8px] leading-[10px] text-center font-normal ${
                                        color === item.name
                                            ? "bg-primary-color text-light-color"
                                            : "bg-light-color-60 text-light-color-60"
                                    }`}
                                    >
                                        {item.value}
                                    </button>
                                ))
                            ) : (
                                <img
                                    className="w-[20px] h-[20px]"
                                    src={Loader}
                                    alt="Loader"
                                />
                            )}
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className="text-[11px] text-light-color font-normal">
                            Размеры:
                        </span>
                        <div className="mt-[5px] flex items-center gap-1 flex-wrap">
                            {!loading ? (
                                sizeList?.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => changeSizeClick(item)}
                                        className={`min-w-[55px] min-h-[20px] flex items-center justify-center rounded-md
                                    text-[8px] leading-[10px] text-center font-normal ${
                                        size === item
                                            ? "bg-primary-color text-light-color"
                                            : "bg-light-color-60 text-light-color-60"
                                    }`}
                                    >
                                        {item}
                                    </button>
                                ))
                            ) : (
                                <img
                                    className="w-[20px] h-[20px]"
                                    src={Loader}
                                    alt="Loader"
                                />
                            )}
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className="text-[11px] text-light-color font-normal">
                            Описание
                        </span>

                        {!loading && stylesCatalog.length !== 0 ? (
                            <div className="flex flex-col">
                                {stylesCatalog[indexStyleCatalog]?.web_data.map(
                                    (data) => {
                                        if (data.incard && !data.style) {
                                            return (
                                                <span
                                                    key={`${data.value}-${data.name}`}
                                                    className="font-inter text-xs text-light-color-60"
                                                >
                                                    {data.name} {data.value}
                                                </span>
                                            );
                                        }
                                    }
                                )}
                            </div>
                        ) : (
                            <img
                                className="w-[20px] h-[20px]"
                                src={Loader}
                                alt="Loader"
                            />
                        )}

                        {/* <div className="font-inter text-xs font-normal text-light-color-60">
                            Стиль: {currentStyle}
                        </div> */}
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
                            onClick={() =>
                                handleClick({
                                    uid: currentUid,
                                    size: size,
                                })
                            }
                            className={`max-w-[160px] flex items-center justify-center gap-1 w-full py-2
                                mt-[5px] text-light-color font-semibold text-[10px] rounded-md ${
                                    sizeList.length === 0
                                        ? "bg-light-color-60"
                                        : "bg-primary-color"
                                }`}
                            disabled={sizeList.length === 0}
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
