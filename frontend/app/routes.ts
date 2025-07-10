import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("url-detail/:id", "routes/url-detail.tsx")] satisfies RouteConfig;
