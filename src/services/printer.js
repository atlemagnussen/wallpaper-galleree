function closePrint() {
    document.body.removeChild(this.__container__);
}

function setPrint() {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
}

function VoucherSourcetoPrint(source) {
    return `<html><head><script>function step1(){
            setTimeout('step2()', 10);}
            function step2(){window.print();window.close()}
            </script></head><body onload='step1()'>
            <img src='${source}' /></body></html>`;
}
function VoucherPrint(source) {
    var Pagelink = "about:blank";
    var pwa = window.open(Pagelink, "_new");
    pwa.document.open();
    pwa.document.write(VoucherSourcetoPrint(source));
    pwa.document.close();
}

const printImage = (url) => {
    const oHiddFrame = document.createElement("iframe");
    oHiddFrame.onload = setPrint;
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.right = "0";
    oHiddFrame.style.bottom = "0";
    oHiddFrame.style.width = "0";
    oHiddFrame.style.height = "0";
    oHiddFrame.style.border = "0";
    oHiddFrame.src = url;
    document.body.appendChild(oHiddFrame);
};

export default { image: VoucherPrint};