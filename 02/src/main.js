import { add } from './js/a';
import { decrement } from './js/b';
import './css/main.css';
// 导入图片资源
import ig1 from './img/1.jpg';
import ig2 from './img/2.png';
import ig3 from './img/3.webp';

const num1 = 100;
const num2 = 200;
console.log(add(num1, num2));
console.log(decrement(num2, num1));

// 创建三个图片对象
const img1 = document.createElement('img');
img1.src = ig1;
const img2 = document.createElement('img');
img2.src = ig2;
const img3 = document.createElement('img');
img3.src = ig3;

// 获取app对象
const app = document.getElementById('app');

// 将三张图片添加到app容器中
app.appendChild(img1);
app.appendChild(img2);
app.appendChild(img3);
