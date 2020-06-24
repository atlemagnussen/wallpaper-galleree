import { docTitle, curRoute } from "../store";
import * as routes from "../routes";
import pathBreaker from "./pathBreaker.js";
let rootTitle = "Trainquility";

class PageState {
    constructor() {
        this.subscribe();
    }

    subscribe() {
        docTitle.subscribe(value => {
            this.setDocTitle(value);
        });
        curRoute.subscribe(value => {
            this.setDocTitleByPath(value);
            this.setWindowLocationIfNot(value);
        });
    }

    setDocTitle(title) {
        document.title = title;
        rootTitle = title;
    }

    setDocTitleByPath(path) {
        const route = pathBreaker.getRoute(path);
        const validRoute = routes.findRoute(route.name);
        if (validRoute)
            document.title = `${rootTitle} - ${validRoute.name}`;
    }

    setWindowLocationIfNot(path) {
        if (!path)
            return;
        if (window.location.pathname != path)
            window.history.pushState({ path }, "", window.location.origin + path);
    }
}

export default new PageState();