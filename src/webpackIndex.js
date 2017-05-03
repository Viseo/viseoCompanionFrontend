import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

class HelloWorld extends React.Component {
    render() {
        return <h1>Hello, World!</h1>;
    }
}

ReactDOM.render(<HelloWorld />, root);


console.log(new HelloWorld().render());