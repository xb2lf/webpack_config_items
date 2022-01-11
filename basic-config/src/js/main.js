import './b';
import '../css/a.css';
import '../css/b.less';

console.log('main.js加载了');

// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('serviceworker注册成功了~');
      })
      .catch(() => {
        console.log('serviceworker注册失败了~');
      });
  });
}
