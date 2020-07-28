class Touch {
    constructor(el, leftFn, rightFn) {
        this.el = el;
        this.leftFn = leftFn;
        this.rightFn = rightFn;
        this.setupEvents();
    }
    setupEvents() {

        this.el.addEventListener("touchstart", (ev) => {
            this.startX = ev.changedTouches[0].screenX;
            this.startY = ev.changedTouches[0].screenY;
        }, false);

        this.el.addEventListener("touchend", (ev) => {
            this.endX = ev.changedTouches[0].screenX;
            this.endY = ev.changedTouches[0].screenY;
            this.handleGesture();
        }, false);
    }
    handleGesture() {
        const xDiff = this.endX - this.startX;
        if (xDiff > 0)
            this.leftFn();
        else
            this.rightFn();
    }
}

export default Touch;
