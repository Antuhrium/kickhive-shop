import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { initInitData, isTMA, useViewport } from "@telegram-apps/sdk-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { useEffect } from "react";
import { setUID } from "./app/slices/userSlice";
import { getUser, registerUser } from "./api/userApi";

function App() {
    const viewPort = useViewport(false);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        viewPort?.expand();
    }, [viewPort]);

    useEffect(() => {
        const getData = async () => {
            const is_tma = await isTMA();

            if (is_tma) {
                const initData = initInitData();
                if (initData?.user?.id) {
                    const res = await getUser(initData.user.id);
                    await registerUser(res.user_uid);

                    dispatch(setUID(res.user_uid));
                }
            }
        };
        getData();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
}

export default App;
