import React, { useState } from "react";
import DeleteIcon from "../assets/svg/delete.svg";

const CartCard = () => {
    const [checked, setChecked] = useState(false);
    const [count, setCount] = useState(1);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);
    const handleDelete = (index: number) => {
        // Remove item from cart
    };
    return (
        <div
            className={`relative flex items-center gap-[15px]
            ${checked ? "border-r-2 border-b-2 border-primary-color" : ""}
            rounded-[15px] bg-light-color-15 w-full p-5`}
        >
            <label className={`relative w-[18px] h-[18px] ${checked ? "bg-primary-color" : "border-2 border-primary-color"} rounded-[5px]`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="opacity-0"
                />
                {checked && (
                    <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-2"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.43495 4.21962C1.27731 4.06849 1.06351 3.98358 0.840575 3.98358C0.617641 3.98358 0.403837 4.06849 0.246199 4.21962C0.0885604 4.37076 0 4.57575 0 4.78949C0 5.00323 0.0885604 5.20821 0.246199 5.35935L2.75765 7.76723C2.83587 7.84161 2.92864 7.90047 3.03064 7.94041C3.13263 7.98035 3.24185 8.0006 3.35202 7.99999C3.46663 7.9965 3.57926 7.97048 3.68295 7.92354C3.78663 7.8766 3.87915 7.80973 3.95477 7.72709L9.81482 1.30609C9.95012 1.14503 10.0154 0.940105 9.99694 0.734049C9.97851 0.527993 9.87783 0.33671 9.71589 0.200084C9.55396 0.0634581 9.34327 -0.00796505 9.12775 0.000706509C8.91223 0.00937807 8.70852 0.0974753 8.55909 0.246629L3.35202 6.02553L1.43495 4.21962Z"
                            fill="white"
                        />
                    </svg>
                )}
            </label>
            <div className="w-[90px] h-[90px] bg-light-color rounded-lg border-r-2 border-b-2 border-primary-color">
                <img src="/shoe-img.png" alt="Shoe" />
            </div>
            <div className="flex flex-col">
                <h2 className="text-xs font-semibold leading-[12px] text-light-color">
                    Nike Dunk Low
                </h2>
                <span className="mt-[5px] text-[11px] text-light-color">
                    Размер: EU 35
                </span>
                <span className="mt-[10px] text-[10px] font-semibold text-primary-color">
                    15 999 ₽
                </span>
                <div className="w-fit flex items-center gap-[6px] bg-primary-color rounded-full px-2 py-1 mt-[10px]">
                    <button onClick={decrement}>
                        <svg
                            width="8"
                            height="2"
                            viewBox="0 0 8 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.21436 0.661118H0.785784C0.746498 0.661118 0.714355 0.69326 0.714355 0.732546V1.26826C0.714355 1.30755 0.746498 1.33969 0.785784 1.33969H7.21436C7.25364 1.33969 7.28579 1.30755 7.28579 1.26826V0.732546C7.28579 0.69326 7.25364 0.661118 7.21436 0.661118Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                    <span className="text-dark-color text-[8px] font-normal">
                        {count}
                    </span>
                    <button onClick={increment}>
                        <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.26779 0.786133H3.73207C3.68445 0.786133 3.66064 0.809942 3.66064 0.857561V3.66113H1.00014C0.95252 3.66113 0.928711 3.68494 0.928711 3.73256V4.26828C0.928711 4.3159 0.95252 4.3397 1.00014 4.3397H3.66064V7.14328C3.66064 7.19089 3.68445 7.2147 3.73207 7.2147H4.26779C4.31541 7.2147 4.33922 7.19089 4.33922 7.14328V4.3397H7.00014C7.04776 4.3397 7.07157 4.3159 7.07157 4.26828V3.73256C7.07157 3.68494 7.04776 3.66113 7.00014 3.66113H4.33922V0.857561C4.33922 0.809942 4.31541 0.786133 4.26779 0.786133Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <button
                onClick={() => handleDelete(1)}
                className="absolute right-[20px] top-[15px]"
            >
                <img src={DeleteIcon} alt="Delete" />
            </button>
        </div>
    );
};

export default CartCard;
