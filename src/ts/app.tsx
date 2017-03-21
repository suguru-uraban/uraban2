/// <reference path="component/cover.tsx"/>

class Main extends React.Component<any, any> {
    render() {
        return <div className="wrapper">
            <Component.Cover />
        </div>;
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("contents")
);
