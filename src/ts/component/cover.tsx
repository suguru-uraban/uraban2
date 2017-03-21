namespace Component {
    export const Cover = (props: any) => {
        return (
            <section className="cover">
                <h1>uraban.info</h1>
                <p>フロントエンドエンジニア・うらばんの<br />ポートフォリオ兼実験場</p>
                <p>現在React+TypeScript+gulpにて構築中</p>
                <figure>
                    <img src="img/profile_img.png" width="100" height="100" />
                </figure>
                <p>お前誰だよ？という方は下記へどうぞ</p>
                <ul>
                    <li><a href="//www.wantedly.com/users/541855" target="_blank">Wantedlyのプロフィール</a></li>
                    <li><a href="//github.com/youg-uraban/" target="_blank">github</a></li>
                </ul>
            </section>
        );
    };
}
