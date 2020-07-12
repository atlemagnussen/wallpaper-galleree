import { docTitle, curRoute } from "../store";
let rootTitle = "Galree";

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

    async setDocTitleByPath() {
        document.title = `${rootTitle}`;
    }

    setWindowLocationIfNot(path) {
        if (!path)
            return;
        if (window.location.pathname != path)
            window.history.pushState({ path }, "", window.location.origin + path);
    }
}

export default new PageState();
