import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Welcome from './Welcome'
import registerServiceWorker from './registerServiceWorker';



// function tick(){
//     const element = (
//         <div>
//             <h1> hello world!</h1>
//             <h2> it is {new Date().toLocaleString()}.</h2>
//         </div>
//     );
//     ReactDOM.render(
//         element,
//         document.getElementById('root')
//     );
// }
//
// setInterval(tick,1000);

ReactDOM.render(<Welcome/>, document.getElementById('root'));
registerServiceWorker();
