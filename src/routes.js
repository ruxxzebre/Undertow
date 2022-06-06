import MainPage from "./views/MainPage.vue";
import NotesPage from "./views/NotesPage.vue";
import NotesListPage from "./views/NotesListPage.vue";
import EditNotePage from "./views/EditNotePage.vue";
import HelpPage from "./views/HelpPage.vue";
import HelloWorld from "./components/HelloWorld.vue";
import _ from "lodash";

export const routes = [
  {
    path: "/",
    showOnSideMenu: true,
    // ! redirect "/hello", - TODO: Fix
    component: HelloWorld,
    title: "Home",
    icon: "home",
  },
  {
    path: "/notes",
    showOnSideMenu: true,
    component: NotesListPage,
    title: "Notes",
    icon: "folder",
    editableProps: {
      icon: "plus",
    },
  },
  {
    path: "/editor/:id",
    component: EditNotePage,
    title: "Note",
    icon: "file-text",
    editableProps: {
      icon: "edit",
    }
  },
  // {
  //   path: "/hello",
  //   component: MainPage,
  //   title: "Hello",
  //   icon: "light-up",
  // },
  {
    path: "/editor",
    showOnSideMenu: true,
    component: EditNotePage,
    title: "Editor",
    icon: "eye",
  },
  {
    path: "/help",
    showOnSideMenu: true,
    component: HelpPage,
    title: "Help",
    icon: "help",
  },
  // {
  // 	path: '*',
  // 	redirect: '/',
  // },
];

/**
 * Gets all the routes
 * @param {string[]} arr - array of keys that won't be ommited
 * @returns
 */
export const getRoutes = (arr = null) => {
  const hiddenPredicate = (_) => !_._hidden;
  if (!arr || !Array.isArray(arr)) {
    return routes.filter(hiddenPredicate);
  }
  return routes.filter(hiddenPredicate).map((route) => {
    return _.pickBy(route, (_, k) => !!arr.includes(k));
  });
};
