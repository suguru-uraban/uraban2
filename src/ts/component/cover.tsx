namespace Component {
    export class Cover extends React.Component<{}, {}> {
        constructor() {
            super();
        }
        render() {
            return (
                <div id="header">
                    <h1 className="title"></h1>
                    <div className="back"></div>
                </div>
            );
        }
    }
}
