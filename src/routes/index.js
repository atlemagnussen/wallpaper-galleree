import Home from "../views/Home.svelte";
import About from "../views/About.svelte";
import SignIn from "../views/SignIn.svelte";
import SignUp from "../views/SignUp.svelte";
import Account from "../views/Account.svelte";
import NotFound from "../views/404.svelte";

import New from "../views/New.svelte";
import Galree from "../views/Galree.svelte";
import Picture from "../views/Picture.svelte";
import All from "../views/All.svelte";
import Tags from "../views/Tags.svelte";

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
            return galComp(bRoute.path, bRoute.param);
        const nf404 = notFound(fullpath);
        return nf404;
    }
        
    const r = route[0];
    return {
        path: r.path,
        component: r.component,
        param: bRoute.param,
        action: bRoute.action
    };
};

const galComp = (param, action) => {
    return {
        path: "galree",
        component: Galree,
        param,
        action
    };
};

const notFound = (path) => {
    return {
        path, 
        component: NotFound
    };
};

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "about",
        component: About,
    },
    {
        path: "signin",
        component: SignIn,
    },
    {
        path: "signup",
        component: SignUp,
    },
    {
        path: "account",
        component: Account
    },
    {
        path: "new",
        component: New
    },
    {
        path: "g",
        component: Galree
    },
    {
        path: "p",
        component: Picture
    },
    {
        path: "all",
        component: All
    },
    {
        path: "tags",
        component: Tags
    }
];
