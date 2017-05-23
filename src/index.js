import React from 'react';
import { render } from 'react-dom';
//CSS
import './style/css/bootstrap.min.css';
import './index.css';
//JS PERSO
import {sampleText} from './sampleText.js';
// Marked.js
import marked from 'marked';

class App extends React.Component{
    state = {
        text: sampleText
    }
    componentWillMount(){ 
        // quand le composent se charge. Il se monte 1 foit puis quand on quitte se démonte. Entre les 2 c'est des updates.
        const localStorageText = localStorage.getItem('text');
        console.log(localStorageText);
        if(localStorageText){
            this.setState({text:localStorageText});
        }
    }
    componentWillUpdate(nextProps, nextState){ // à la maj du state
        localStorage.setItem('text', nextState.text);
    }
    editText = (event) => {
        const text = event.target.value;
        this.setState({text});
    }
    renderText = (text) => {
        const renderText = marked(text, {sanitize: true});
        return {__html: renderText};
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <textarea 
                            className="form-control" 
                            rows="35" 
                            value={this.state.text}
                            onChange={(e) => this.editText(e)}
                        >
                        
                        </textarea>
                    </div>
                    <div className="col-sm-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
                    </div>
                </div>
            </div>
        )
    }
}
render(
    <App />,
    document.getElementById('root')
);