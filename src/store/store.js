import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { packagesSlice } from "./modules/slices/packagesSlice";
import { employeesSlice } from "./modules/slices/employeesSlice";
import { deliveryAgentsSlice } from "./modules/slices/deliveryAgentsSlice";

export const store = configureStore({
    reducer: {
        auth:authSlice.reducer,
        deliveryAgents: deliveryAgentsSlice.reducer,
        employees: employeesSlice.reducer,
        packages: packagesSlice.reducer,
    }
});