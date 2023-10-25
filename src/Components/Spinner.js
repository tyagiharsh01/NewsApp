import React, { Component } from 'react'
import loader from'./loader.gif'

export class Spinner extends Component {
  render() {
    return (
        <div className="text-center">
        <img className="my-3" src={loader} alt="loading" />
    </div>
    )
  }
}

export default Spinner
