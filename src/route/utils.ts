import type { RouteRecordRaw } from "vue-router";

export function routeSerialize(
  routes: Array<RouteRecordRaw>,
  path: string | null = null,
) {
  const serializedRoutes: Array<RouteRecordRaw> = [];

  routes.forEach((route) => {
    const rootRoute = path ? path + "/" + route.path : route.path;
    if (route.component) {
      if (!route.name || !route.path) console.warn("missing name or path");
      const currentPath = path === null ? route.path : path + "/" + route.path;
      serializedRoutes.push({
        name: route.name,
        path: currentPath,
        component: route.component,
      });
    }
    if (route.children)
      route.children.forEach((child) => {
        const hasChildren =
          Array.isArray(child.children) && child.children.length > 0;
        if (hasChildren) {
          const childrenRoutes = routeSerialize(
            child.children || [],
            rootRoute + "/" + child.path,
          );
          serializedRoutes.push(...childrenRoutes);
        }
        if (child.component) {
          const tempRoute = {
            path: child.path === "" ? rootRoute : rootRoute + "/" + child.path,
            name: child.name,
            component: child.component,
          };
          serializedRoutes.push(tempRoute);
        }
      });
  });
  return serializedRoutes;
}
