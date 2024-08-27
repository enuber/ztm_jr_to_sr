import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

export interface IRobot {
  name: string;
  id: number;
  email: string;
}

// no props are in the APP file so this is empty
interface IAppProps {}

interface IAppState {
  robots: Array<IRobot>;
  searchfield: string;
}

class App extends Component<IAppProps, IAppState> {
  state: IAppState = {
    robots: [],
    searchfield: '',
  };

  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchfield: evt.target.value });
  };

  render(): JSX.Element {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
