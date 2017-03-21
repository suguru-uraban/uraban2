declare function require(x: string): any;

let React: any = require("react");
let ReactDOM: any = require("react-dom");

class Main {
    constructor() {
        ReactDOM.render(
            (<div>Hello React</div>),
            document.querySelector("#contents")
        );
    }
}

new Main();
