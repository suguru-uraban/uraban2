let React = require("react"),
    ReactDOM = require("react-dom");

declare function fetch(url: String): any;
declare function fetch(url: String, option: any): any;

class Main {
    constructor() {
        ReactDOM.render(
            (
                <div>
                    Hello React
                </div>
            ),
            document.querySelector("#contents")
        );
    }
}

new Main();
