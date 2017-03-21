var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component;
(function (Component) {
    Component.Cover = function (props) {
        return (React.createElement("section", { className: "cover" },
            React.createElement("h1", null, "uraban.info"),
            React.createElement("p", null,
                "\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9\u30A8\u30F3\u30B8\u30CB\u30A2\u30FB\u3046\u3089\u3070\u3093\u306E",
                React.createElement("br", null),
                "\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA\u517C\u5B9F\u9A13\u5834"),
            React.createElement("p", null, "\u73FE\u5728React+TypeScript+gulp\u306B\u3066\u69CB\u7BC9\u4E2D"),
            React.createElement("figure", null,
                React.createElement("img", { src: "img/profile_img.png", width: "100", height: "100" })),
            React.createElement("p", null, "\u304A\u524D\u8AB0\u3060\u3088\uFF1F\u3068\u3044\u3046\u65B9\u306F\u4E0B\u8A18\u3078\u3069\u3046\u305E"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { href: "//www.wantedly.com/users/541855", target: "_blank" }, "Wantedly\u306E\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB")),
                React.createElement("li", null,
                    React.createElement("a", { href: "//github.com/youg-uraban/", target: "_blank" }, "github")))));
    };
})(Component || (Component = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        return React.createElement("div", { className: "wrapper" },
            React.createElement(Component.Cover, null));
    };
    return Main;
}(React.Component));
ReactDOM.render(React.createElement(Main, null), document.getElementById("contents"));
