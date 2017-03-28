/// <reference path="component/cover.tsx" />
/// <reference path="component/header.tsx" />
/// <reference path="component/mainBody.tsx" />

class App extends React.Component<any, any> {
    render() {
        return (
            <div className="wrapper">
                <Component.Header />
                <Component.MainBody />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("contents")
);
