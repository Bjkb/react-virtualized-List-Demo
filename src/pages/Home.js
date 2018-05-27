import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Lists from './Lists';
import AutoSizeList from './AutoSizeList';
import InfiniteLoaderList from './InfiniteLoaderList';
import './style.css';

class Home extends Component {
  render() {
    return [
      <div className="App" key='nav'>
        <h3>部分API实例的使用</h3>
        <ul>
          <li><Link to="/Lists">List</Link></li>
          <li><Link to="/AutoSizeList">AutoSizer、CellMeasurer跟List</Link></li>
          <li><Link to="/InfiniteLoaderList">InfiniteLoader跟List</Link></li>
        </ul>
      </div>,
      <Switch key='switch'>
        <Route exact path="/Lists" component={Lists} />
        <Route exact path="/AutoSizeList" component={AutoSizeList} />
        <Route exact path="/InfiniteLoaderList" component={InfiniteLoaderList} />
      </Switch>
    ]
  }
}

export default Home;
