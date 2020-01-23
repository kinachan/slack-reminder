const whatElem = document.getElementById('What');
const whenElem = document.getElementById('When');
const whoElem = document.getElementById('Who');
const clipboard = new ClipboardJS(".copy-to-clipboard");

const resultElem = document.getElementById('Result');
const mentionList = document.getElementById('MentionList');

const events = [whatElem, whenElem, whoElem];

mentionList.addEventListener('blur', (ev) => {
  const text = ev.target.value;
  const values = text.split(',');

  const cookieValue = values.reduce((prev, _val) => {
    let value = _val.trim();
    if (value == null || value === '') return prev;

    if (value.indexOf('@') === -1) {
      value = '@' + value;
    }
    return [...prev, value];
  }, []).join(',');
  const result = setCookie({
    name: 'mention',
    value: cookieValue,
    expires: moment('2037-12-31').toString()
  });
  const mentionMessage = document.getElementById('MentionMessage');
  mentionMessage.innerText = `メンションのリストを更新しました。登録値:${cookieValue}`;
  showSnackBar(mentionMessage);
  init();
});

const createCommand = () => {
  const what = whatElem.value;
  const when = whenElem.value;
  const who = whoElem.value;

  if (when == '' || when == null) {
    resultElem.innerText = '正しい日付を入力してください';
    return;
  }

  const date = when.split('T')[0].replace(/\-/g, '/');
  const time = when.split('T')[1];
  // const 

  const command = `/remind ${who} ${what} on ${date} ${time}`;
  resultElem.innerText = command;

  let vh = window.innerHeight * 0.01;
  // カスタム変数--vhの値をドキュメントのルートに設定
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

events.forEach(e => {
  e.addEventListener('input', (ev) => {
    createCommand();
  })
});

whenElem.addEventListener('chnage', ev => {
  createCommand();
})

const init = () => {
  const today = new Date();
  const dateString = moment().format('YYYY-MM-DD');

  whenElem.value = `${dateString}T09:00`;

  // Cookieから取得したメンションのselectを作成＆inputにセットする
  const mention = getCookie('mention');
  if (mention != null) {
    mentionList.value = mention;
    const html = mention.split(',').map(m => `<option value="${m}">${m}</option>`).join('');
    whoElem.innerHTML = whoElem.innerHTML + html;
  }

  let vh = window.innerHeight * 0.01;
  // カスタム変数--vhの値をドキュメントのルートに設定
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const showSnackBar = (elem) => {
  elem.classList.add('show');
  setTimeout(() => {
    copyMessage.classList.remove('show');
  }, 3000);
}

clipboard.on('success', function (e) {
  e.clearSelection();
  const copyMessage = document.getElementById("CopyMessage");
  showSnackBar(copyMessage);
});

init();