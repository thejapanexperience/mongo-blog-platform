import React, { Component } from 'react';
import {Link} from 'react-router';
import {render} from 'react-dom';
require('bootstrap-loader');

export default class Navbar extends Component {
  render() {
    return (

        <div className="container-fluid">
          <div className="row">
            <Link to='/'><div className="col-sm-4"><button className="btn btn-lg btn-block" href="#">Home</button></div></Link>
            <Link to='/adddata'><div className="col-sm-4"><button className="btn btn-lg btn-block" href="#">Choose Blog</button></div></Link>
            <Link to='/viewdata'><div className="col-sm-4"><button className="btn btn-lg btn-block" href="#">Blog</button></div></Link>
          </div>
          </div>
        )
      }
}
