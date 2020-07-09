import Home from "../views/Home.svelte";
import About from "../views/About.svelte";
import SignIn from "../views/SignIn.svelte";
import SignUp from "../views/SignUp.svelte";
import Account from "../views/Account.svelte";
import NotFound from "../views/404.svelte";

import New from "../views/New.svelte";
import Galree from "../views/Galree.svelte";

import service from "../services/galreeService";
import pathBreaker from "../services/pathBreaker.js";
export const findComponent = async (path) => {
    const r = await findRoute(path);
    return r.component;
};

export const findRoute = async (fullpath) => {
    const bRoute = pathBreaker.getRoute(fullpath);
    const route = routes.filter(r => r.path === bRoute.path);
    if (!route || route.length === 0) {
        const gal = await service.find(bRoute.path);
        if (gal)
            return galComp(bRoute.path);
        const nf404 = notFound(bRoute.path);
        return nf404;
    }
        
    return route[0];
};
const galComp = (id) => {
    return {
        path: "galree",
        param: id,
        name: "Gallery",
        component: Galree
    };
};

const notFound = (path) => {
    return {
        path, 
        name: "Not Found",
        component: NotFound
    };
};
export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "about",
        name: "About",
        component: About,
    },
    {
        path: "signin",
        name: "Sign in",
        component: SignIn,
    },
    {
        path: "signup",
        name: "Reg",
        component: SignUp,
    },
    {
        path: "account",
        name: "Account",
        component: Account
    },
    {
        path: "new",
        name: "New gallery",
        component: New
    }
];
