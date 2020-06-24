class Helper {
    getInitials(name) {
        if (name && name.length > 2) {
            return `${name.charAt(0)}${name.charAt(1)}`.toUpperCase();
        }
        return "US";
    }
    uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default new Helper();