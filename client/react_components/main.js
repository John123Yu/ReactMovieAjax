var React = require('react'),
	ReactDOM = require('react-dom'),
	ReactRouter = require('react-router'),
	axios = require('axios'),
	Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    IndexRoute = ReactRouter.IndexRoute,
    Link = ReactRouter.Link


window.onhashchange = function() {
	switch (location.hash) {
		case "#Title":
			ReactDOM.render(<Title/>, document.getElementById('app'));
			break;
		default:
			ReactDOM.render(<Title/>, document.getElementById('app'));
			break;
	}
}

var Title = React.createClass({
	getInitialState: function(){
        return {
        title: "",
        information: ""
        }
    },
    render: function (){
		return (
			<div>
				<h1>Search by Title</h1>
				<form onSubmit={this._searchTitle}>
					<p>Title: <input onChange = {this.handleTitleChange}/> {this.state.title}</p>
					<p><input type = "submit" value = "submit"/></p>
				</form>
				<ul>{this.state.information}</ul>
			</div>
		)
	},
	handleTitleChange: function(event){
        this.setState({title: event.target.value });
    },
    _searchTitle: function(e) {
    	e.preventDefault();
    	var self = this
    	axios.get('http://www.omdbapi.com/?', {params : {t: this.state.title}}).then(function (response) {
    		console.log(response)
    		var description = [];
    		for(item in response.data) {
    			if(response.data[item] != "N/A") {
	    			description.push(item + ": " + response.data[item])
    			}
    		}
    		const listItems = description.map((number) =>
			    <li>{number}</li>
			);
			self.setState({information: listItems });
		})
    }
});
