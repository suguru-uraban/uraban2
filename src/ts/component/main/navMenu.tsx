namespace Component.Main {
    export class NavMenu extends React.Component<any, any> {
        render() {
            return (
                <nav id="navMenu">
                    <p>全て表示</p>
                    <ul>
                        <li>自己紹介</li>
                        <li>WEB技術あれこれ</li>
                        <li>個人事業主あれこれ</li>
                        <li>その他いろいろ</li>
                    </ul>
                </nav>
            );
        }
    }
}
