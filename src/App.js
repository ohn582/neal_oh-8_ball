import React, {Component} from 'react';
import ball from './image/ball.jpeg';
import Loading from './Loading';
import './App.css';

class App extends Component {

  state = {
    question: "",
    magic: {}, /* Provides a list of "answer", "question", and "type" */
    history: [], /* Provides a list of our array of our history results */
    boolean: false /* This is for a loading display. It will make the boolean true once you click the submit button */
  }

  /* 'handleOnChange' is referring to our input name 'question' and it 
  will allow us to write any letters in the text bar. */
  handleChange = e => {
      e.preventDefault();
      // debugger
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  /* Referring to the 'Submit' button from the form JSX. */
  handleOnSubmit = e => {
    // // debugger
    e.preventDefault(); /* Prevented from refreshing the website after clicking. */
    let userQuest = this.state.question /* Referring to our question fron state */
    let validQuestion = userQuest.endsWith("?") /* A text question that ends with a '?' */

    this.setState({ /* This is for the loading display. It will only show once you click the 'Submit' button. */
      boolean: true
    })

    /* lines 36 - 66: This creates a true & flase statement whether or not it ends with an '?'*/
    /* lines 36 - 66: If it does end with an '?', then our question will be added to our 'uri' and convert to our JSON  */
    if(validQuestion){
      let params = encodeURIComponent(userQuest);
      let uri = "https://8ball.delegator.com/magic/JSON/" + params;
      // debugger
     fetch(uri)
      .then(response => response.json())
      .then(rev => this.setState({
        magic: rev.magic, 
        history: [ /* lines 51 - 58: This will allow us to add our "answer", "question", and "type" to our history array. */
          ...this.state.history, /* This is referring to our history array from state */
          {
            question: rev.magic.question,
            answer: rev.magic.answer,
            type: rev.magic.type
          }
        ]
      }))
      .then(() => {
        let adHistory = this.state.history /* Using the history array from state */
        if(adHistory.length > 10){ /* It's going to check if our variable 'adHistory' is greader than 10, then it add our data to the new array(history) */
          adHistory.unshift()
        }
        this.setState({
          history: adHistory
        })
      })
    }else{
      alert('You need to add a "?" at the end.') /* This will only display if you don't end it with a '?' */
    }
  };


  /* lines 74 - 90: This will display our history alert once we click our "Show History" */
  historyClick = e => {
    // debugger
    // let userQuest = this.state.question
    e.preventDefault();

    /* It will disply: Question:, Answer:, Type: on the alert */
    let recentHistory = this.state.history;
    recentHistory.reverse() /* Using reverse method will allow the latest result be first in the list */
    recentHistory = recentHistory.map(data => {
     return `Question: ${data.question}, 
      Answer: ${data.answer}, 
      Type: ${data.type}\n`
    })
    alert(recentHistory)
  }




  
  render(){ 
    return(
      <>
        <div>
          <h1 className='mainTitle'>Magic 8-Ball</h1>
          <img src={ball} className='magicBall' alt="" />
          <p className='qr'>Query Result</p>
            {/* line 98: ternary function true & flase statement. JSON.stringify(this.state.magic !== "{}" - converts into a string */}
            {/* line 98: this.state.boolean ? <Loading/> : null - This will allow to show a loading display after clicking a submit button. */}
            <p className='response'>{ JSON.stringify(this.state.magic) !== "{}" ? this.state.magic.answer : this.state.boolean ? <Loading/> : null }</p>
          <form className='textForm' onSubmit={this.handleOnSubmit}>
            <p className='qr'>Question:</p>
            <input type='text' className='textBox' name='question' value={this.state.question} onChange={this.handleChange} />
            <br/>
            <br/>
            <button type='submit' className='close'>Submit Button</button>
            <br/>
            <br/>
            <button onClick={this.historyClick} className='close'>Show History</button>
          </form>
        </div>
      </>
    )
  }
}

export default App;
