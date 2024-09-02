import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { useInitData } from "@telegram-apps/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { useEffect } from "react";
import { setUID } from "./app/slices/userSlice";
import { getUser, registerUser } from "./api/userApi";

function App() {
    const initData = useInitData();
    const dispatch = useDispatch<AppDispatch>();
    const uid = useSelector((state: RootState) => state.user.uid);

    useEffect(() => {
        const getData = async () => {
            if (initData?.user?.id) {
                const res = await getUser(initData.user.id);
                await registerUser(res.user_uid);

                dispatch(setUID(res.user_uid));
            }
        };
        getData();
    }, [initData]);

    useEffect(() => {
        if (uid !== "" && initData?.user?.id) {
            console.log(initData.user.id);
        }
    }, [uid]);

    const isTg = Boolean(initData?.user);

    if (!isTg) {
        return <p>You are not using Telegram.</p>;
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
}

export default App;
