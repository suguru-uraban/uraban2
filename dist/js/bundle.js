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
var Component;
(function (Component) {
    Component.Header = function (props) {
        return (React.createElement("header", { id: "header" },
            React.createElement("div", { className: "headerWrap" },
                React.createElement("h1", null, "uraban.info"),
                React.createElement("p", { className: "caption" }, "\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9\u30A8\u30F3\u30B8\u30CB\u30A2\u30FB\u3046\u3089\u3070\u3093\u306E\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA\u517C\u5B9F\u9A13\u5834"))));
    };
})(Component || (Component = {}));
var Component;
(function (Component) {
    var Main;
    (function (Main) {
        var NavMenu = (function (_super) {
            __extends(NavMenu, _super);
            function NavMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NavMenu.prototype.render = function () {
                return (React.createElement("nav", { id: "navMenu" },
                    React.createElement("p", null, "\u5168\u3066\u8868\u793A"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "\u81EA\u5DF1\u7D39\u4ECB"),
                        React.createElement("li", null, "WEB\u6280\u8853\u3042\u308C\u3053\u308C"),
                        React.createElement("li", null, "\u500B\u4EBA\u4E8B\u696D\u4E3B\u3042\u308C\u3053\u308C"),
                        React.createElement("li", null, "\u305D\u306E\u4ED6\u3044\u308D\u3044\u308D"))));
            };
            return NavMenu;
        }(React.Component));
        Main.NavMenu = NavMenu;
    })(Main = Component.Main || (Component.Main = {}));
})(Component || (Component = {}));
var Component;
(function (Component) {
    var MainBody = (function (_super) {
        __extends(MainBody, _super);
        function MainBody() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainBody.prototype.render = function () {
            return (React.createElement("main", { id: "mainBody" },
                React.createElement(Component.Main.NavMenu, null)));
        };
        return MainBody;
    }(React.Component));
    Component.MainBody = MainBody;
})(Component || (Component = {}));
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", { className: "wrapper" },
            React.createElement(Component.Header, null),
            React.createElement(Component.MainBody, null)));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById("contents"));
