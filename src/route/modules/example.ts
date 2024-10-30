export default {
  path: "/example",
  name: "example",
  component: () => import("../../view/example/index.vue"),
  children: [
    {
      path: "list",
      name: "exampleList",
      component: () => import("../../view/example/list/exampleList.vue"),
    },
  ],
};
