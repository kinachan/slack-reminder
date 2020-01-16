const whatElem = document.getElementById('What');
const whenElem = document.getElementById('When');
const whoElem = document.getElementById('Who');
var clipboard = new ClipboardJS( ".copy-to-clipboard" ) ;
// var clipboard = new clipboard('.copy-to-clipboard');

const resultElem = document.getElementById('Result');


const events = [whatElem, whenElem, whoElem];

const createCommand = () => {
  const what = whatElem.value;
  const when = whenElem.value;
  const who = whoElem.value;

  if (when == '' || when == null) {
    resultElem.innerText = '正しい日付を入力してください';
    return;
  }

  const date = when.split('T')[0].replace(/\-/g,'/');
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

  whenElem.value = `${dateString}T09:00`

  let vh = window.innerHeight * 0.01;
  // カスタム変数--vhの値をドキュメントのルートに設定
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

clipboard.on('success', function(e) {
  e.clearSelection();
  const copyMessage = document.getElementById("CopyMessage");
  copyMessage.classList.add('show');
  setTimeout(()=> {
    copyMessage.classList.remove('show'); 
  }, 3000);
});

init();