import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "swiper/css";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { SDKProvider } from "@telegram-apps/sdk-react";

createRoot(document.getElementById("root")!).render(
    <SDKProvider acceptCustomStyles debug>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </SDKProvider>
);
