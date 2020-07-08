import Home from "../views/Home.svelte";
import About from "../views/About.svelte";
import SignIn from "../views/SignIn.svelte";
import SignUp from "../views/SignUp.svelte";
import Account from "../views/Account.svelte";
import NotFound from "../views/404.svelte";

export const findComponent = (path) => {
    const r = findRoute(path);
    return r.component;
};

export const findRoute = (path) => {
    const r = routes.filter(r => r.path === path);
    if (!r || r.length === 0) {
        const nf404 = notFound(path);
        return nf404;
    }
        
    return r[0];
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
    }
];
