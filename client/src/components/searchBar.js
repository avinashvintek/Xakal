import React ,{Component} from 'react'
import {DebounceInput} from 'react-debounce-input';

class SearchBar extends Component{
    state = {
        query:''
    }

    handleInputChange =(e)=>{
        this.setState({
            query:e.target.value
        })
        this.props.onSearchSubmit(e.target.value)
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        // this.props.onSearchSubmit(this.state.query)
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                        <DebounceInput
                        minLength={3}
                        debounceTimeout={500}
                        placeholder='Search User By ID'
                        className="add-border search-input"
                        value={this.state.query}
                        onChange={this.handleInputChange} />
                
                {/* <input className="add-border search-input" type="text" placeholder='Search User By ID' onChange={this.handleInputChange} /> */}
            </form>
        )
    }
}

export default SearchBar