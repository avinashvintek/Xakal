import React ,{Component} from 'react'

class SearchBar extends Component{
    state = {
        query:''
    }

    handleInputChange =(e)=>{
        this.setState({
            query:e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.onSearchSubmit(this.state.query)
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                
                <input className="add-border search-input" type="text" placeholder='Search User By ID' onChange={this.handleInputChange} />
            </form>
        )
    }
}

export default SearchBar