import React from "react";

interface ModalMessageProps {
    title: string;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ title }) => {
    return (
        <div
            className="card-dark-bg w-full h-full flex items-center justify-center py-4
                bg-primary-color-30 border border-primary-color rounded-2xl backdrop-blur-md
                font-semibold text-sm text-light-color after:rounded-2xl"
        >
            {title}
        </div>
    );
};

export default ModalMessage;
