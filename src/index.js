import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.onClickHandler = this.onClickHandler.bind(this)
  }
  onClickHandler () {
    alert(this.props.clickText)
  }
  render () {
    return (
       <div>
        <p>This is about page</p>
        <button onClick={this.onClickHandler}>Click me!</button>
      </div>
    )
  }
}
About.propTypes = {
    clickText: PropTypes.string.isRequired
}

class Home extends React.Component {
  render () {
    return (
      <div>
        Welcome home
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter basename='/'>
    <div className='page'>
      <Link to='/about'>About</Link> <Link to='/'>Home</Link>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about'>
          <About clickText='The button has been clicked!' />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('app')
)
