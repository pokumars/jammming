import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            term:''
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.pressedEnter= this.pressedEnter.bind(this);
    }

    search(){
        this.props.onSearch(this.state.term)
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    //pressing enter submits the search query
    pressedEnter(event){
      //to add "enter to search functionality", onKeyPress -> pressEnter() -> call handleSearch

      if(event.key == 'Enter'){
        this.search(event);
        //event.preventDefault();
      }
    }

    render(){
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.pressedEnter}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}
export default SearchBar;