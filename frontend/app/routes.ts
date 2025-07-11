import { type RouteConfig, layout, index, route } from "@react-router/dev/routes";

export default [
    layout("layout/header.tsx", [
        index("routes/dashboard.tsx"), 
        route("url-detail/:id", "routes/url-detail.tsx")
    ])] satisfies RouteConfig;
