(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown = (event) => {
        if(event.keyCode === 13){
            assessmentButton.onclick();
        }
    }
    
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if(userName.length === 0){ //名前が空欄の時は処理を終了する
            return;
        }

        removeAllChildren(resultDivided);

        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたの背後には……&ref_src=twsrc%5Etfw';

        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet %E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E8%83%8C%E5%BE%8C%E3%81%AB%E3%81%AF%E2%80%A6%E2%80%A6&ref_src=twsrc%5Etfw&text='
            + encodeURIComponent(result);
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }

    const answers = [
        '{userName}の背後には怨霊がいます。怖いですね。',
        '{userName}の背後には守護霊がいます。良かったですね。',
        '{userName}の背後にはヒットマンがいます。大変ですね。',
        '{userName}の背後には犬がいます。かわいいですね。',
        '{userName}の背後には猫がいます。かわいいですね。',
        '{userName}の背後にはメリーさんがいます。不思議ですね。',
        '{userName}の背後には熊がいます。落とし物ですね。',
        '{userName}の背後には人がいます。誰でしょうね。',
        '{userName}の背後には黒幕がいます。すごいですね。',
        '{userName}の背後には大物がいます。すごいですね。',
        '{userName}の背後には狐がいます。憑かれますね。',
        '{userName}の背後には国がいます。すごいですね。',
        '{userName}の背後には死神がいます。嫌ですね。',
        '{userName}の背後にはゾンビがいます。怖いですね。',
        '{userName}の背後にはピエロがいます。びっくりですね。',
        '{userName}の背後には{userName}がいます。ドッペルゲンガーですね。'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName){
        let sumOfcharCode = 0;
        for(let i = 0; i < userName.length; i++){
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);

        return result;
    }

    //テストコード
    console.assert(
        assessment('く') === 'くの背後にはくがいます。ドッペルゲンガーですね。',
        '診断結果である文言の名前を置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('あ') === assessment('あ'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
