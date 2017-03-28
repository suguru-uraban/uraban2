/// <reference path="main/navMenu.tsx" />

namespace Component {
    export class MainBody extends React.Component<any, any> {
        render() {
            return (
                <main id="mainBody">
                    <Component.Main.NavMenu />
                </main>
            );
        }
    }
}
