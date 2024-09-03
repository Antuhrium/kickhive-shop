import React, { useEffect, useState } from "react";
import { getDelivery } from "../api/productApi";

import MapPoint from "../assets/svg/map.svg";

interface deliveryDataType {
    [day: string]: {
        positions: {
            address: string;
            name: string;
            time: string;
        }[];
        quick_name: string;
    };
}

interface ModalDelivery {
    setModalCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDelivery: React.FC<ModalDelivery> = ({ setModalCard }) => {
    const [deliveryData, setDeliveryData] = useState<deliveryDataType>({});

    useEffect(() => {
        async function getData() {
            const res = await getDelivery();
            setDeliveryData(res);
        }
        getData();
    }, []);

    return (
        <>
            <div
                className="fixed z-20 backdrop-blur-sm inset-0 bg-dark-color-10"
                onClick={() => setModalCard(false)}
            />
            <div
                className="fixed z-30 inset-x-[25px] top-1/2 -translate-y-1/2 bg-dark-color-85
            backdrop-blur-[10px] border border-primary-color px-[15px] pt-4 rounded-[20px]
            max-h-[90vh] min-h-[30vh] flex flex-col"
            >
                <button
                    className="absolute top-3 right-5 text-lg font-semibold text-light-color"
                    onClick={() => setModalCard(false)}
                >
                    X
                </button>
                <div className="overflow-auto pb-4 no-scroll">
                    {Object.entries(deliveryData).map(([day, details]) => (
                        <div key={day} className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-light-color mt-4">
                                {details.quick_name}
                            </span>
                            <div className="flex flex-col gap-2">
                                {details.positions.map((position, index) => (
                                    <div className="relative flex items-center gap-3 border-r-2 border-b-2 border-primary-color rounded-[15px] bg-light-color-15 w-full px-2 py-2">
                                        <img src={MapPoint} alt="Map Point" />
                                        <div
                                            key={index}
                                            className="text-[11px] text-light-color-60 flex flex-col gap-px"
                                        >
                                            <h4 className="text-xs text-light-color">
                                                {position.name}
                                            </h4>
                                            <p>{position.address}</p>
                                            <p>{position.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ModalDelivery;
