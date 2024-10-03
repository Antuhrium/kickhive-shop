import React, { useEffect, useState } from "react";
import { getDeliveryInfo } from "../api/cartApi";

interface ModalDeliveryInfo {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDeliveryInfo: React.FC<ModalDeliveryInfo> = ({ onClose }) => {
    const [info, setInfo] = useState<string>("");

    useEffect(() => {
        const getInfo = async () => {
            const res = await getDeliveryInfo();
            setInfo(res.result);
        };

        getInfo();
    }, []);

    return (
        <>
            <div
                className="fixed z-20 backdrop-blur-sm inset-0 bg-dark-color-10"
                onClick={() => onClose(false)}
            />
            <div
                className="fixed z-30 inset-x-[25px] top-1/2 -translate-y-1/2 bg-dark-color-85
                            backdrop-blur-[10px] border border-primary-color px-[15px] py-8 rounded-[20px]
                            max-h-[90vh] flex flex-col"
            >
                <button
                    className="absolute z-30 top-3 right-5 text-lg font-semibold text-light-color"
                    onClick={() => onClose(false)}
                >
                    X
                </button>
                <pre className="text-xs text-light-color whitespace-pre-wrap">
                    {info}
                </pre>
            </div>
        </>
    );
};

export default ModalDeliveryInfo;
