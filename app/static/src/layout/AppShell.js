var React = require('react');

//Constant declarations
const LISTEDMOVIE = 1;
const NEWMOVIE = 2;
const REWATCHMOVIE = 1;
const NOREWATCHMOVIE = 2;
const ADDNEWMOVIE = 3;

//Global incrementing ID for all movie objects
id = 4;

var MovieOrganizer = React.createClass({
    getInitialState: function() {
        return {
          unseenMovies : [{Poster: "http://ecx.images-amazon.com/images/I/51TUxWTG27L.jpg", Title: "Unsure", Year: 1994, id : 1}],
          rewatchMovies : [{Poster: "http://ecx.images-amazon.com/images/I/51TUxWTG27L.jpg", Title: "Good", Year: 1994, id : 2}],
          norewatchMovies : [{Poster: "http://ecx.images-amazon.com/images/I/51TUxWTG27L.jpg", Title: "Bad", Year: 1994, id : 3}]
        };
    },
    //Inefficient way of removing a movie
    //Just a note: If I stored all three categories in one array and had another attribute "category" or something, I could remove them in o(1) time.
    removeMovie: function(movie){
        console.log("Attempting to remove " + movie.Title + " with id: " + movie.id);

        for(var i = 0; i < this.state.unseenMovies.length; i++) {
            if ( movie.id == this.state.unseenMovies[i].id ) {
                var unseenCopy = this.state.unseenMovies;
                unseenCopy.splice(i, 1); // Remove this movie

                this.setState({
                    unseenMovies : unseenCopy
                })

                console.log("Removed " + movie.Title + " from unseen");
            }
        }

        for(var i = 0; i < this.state.rewatchMovies.length; i++) {
            if ( movie.id == this.state.rewatchMovies[i].id ) {
                var rewatchCopy = this.state.rewatchMovies;
                rewatchCopy.splice(i, 1); // Remove this movie

                this.setState({
                    norewatchMovies : rewatchCopy
                })

                console.log("Removed " + movie.Title + " from rewatchMovies");
            }
        }

        for(var i = 0; i < this.state.norewatchMovies.length; i++) {
            if ( movie.id == this.state.norewatchMovies[i].id ) {
                var norewatchCopy = this.state.norewatchMovies;
                norewatchCopy.splice(i, 1); // Remove this movie

                this.setState({
                    norewatchMovies : norewatchCopy
                })

                console.log("Removed " + movie.Title + " from norewatchMovies");
            }
        }
        //console.log("Current Key: " + id);
    },
    addNewMovie: function(movie){
        this.removeMovie(movie); //Un-necessarily called when adding a movie from "Find More Movies"

        //TODO: I'm making a copy because I couldn't figure out how I'm supposed to append to an array in state?
        var unseenCopy = this.state.unseenMovies;
        unseenCopy.push({Poster: movie.Poster, Title: movie.Title, Year: movie.Year, id: id, type: LISTEDMOVIE})
    
        this.setState({
            unseenMovies: unseenCopy
        }) 

        console.log("Added " + movie.Title + " with id " + movie.id + " to unseen");
        console.log(this.state.unseenMovies);
    },
    addMovieToRewatch: function(movie){
        this.removeMovie(movie);

        //TODO: I'm making a copy because I couldn't figure out how I'm supposed to append to an array in state?
        var rewatchCopy = this.state.rewatchMovies;
        rewatchCopy.push({Poster: movie.Poster, Title: movie.Title, Year: movie.Year, id: movie.id, type: LISTEDMOVIE})
    
        this.setState({
            rewatchMovies: rewatchCopy
        }) 

        console.log("Added " + movie.Title + " with id " + movie.id + " to rewatch");
        console.log(this.state.rewatchMovies);
    },
    addMovieToNoRewatch: function(movie){
        this.removeMovie(movie);

        //TODO: I'm making a copy because I couldn't figure out how I'm supposed to append to an array in state?
        var norewatchCopy = this.state.norewatchMovies;
        norewatchCopy.push({Poster: movie.Poster, Title: movie.Title, Year: movie.Year, id: movie.id, type: LISTEDMOVIE})
    
        this.setState({
            norewatchMovies: norewatchCopy
        }) 

        //norewatchMovies.push({Poster: movie.Poster, Title: movie.Title, Year: movie.Year, type: LISTEDMOVIE});
        console.log("Added " + movie.Title + " with id " + movie.id + " to norewatch");
        console.log(this.state.norewatchMovies);
    },
    render: function() {
        return (
            <div>
                <SearchBar />

                <h3>Movies To See!</h3>
                <hr />
                <MovieList data={this.state.unseenMovies} type={LISTEDMOVIE} addMovieToRewatch={this.addMovieToRewatch} addMovieToNoRewatch={this.addMovieToNoRewatch} addNewMovie={this.addNewMovie}/>

                <h3>Movies To See Again!</h3>
                <hr />
                <MovieList data={this.state.rewatchMovies} type={LISTEDMOVIE} addMovieToRewatch={this.addMovieToRewatch} addMovieToNoRewatch={this.addMovieToNoRewatch} addNewMovie={this.addNewMovie}/>

                <h3>Movies To Never See Again...</h3>
                <hr />
                <MovieList data={this.state.norewatchMovies} type={LISTEDMOVIE} addMovieToRewatch={this.addMovieToRewatch} addMovieToNoRewatch={this.addMovieToNoRewatch} addNewMovie={this.addNewMovie}/>

                <AddMovie addMovieToRewatch={this.addMovieToRewatch} addMovieToNoRewatch={this.addMovieToNoRewatch} addNewMovie={this.addNewMovie}/>
            </div>);
    }
});

var SearchBar = React.createClass({
    handleSearch: function(){
        alert("Searching...");
    },
    render: function() {
        return (
            <form className="form-inline" role="form">
                <input type="text" className="form-control" placeholder="Type a movie or genre" onChange={this.handleSearch}/>
                <select className="form-control">
                    <option>Unseen</option>
                    <option>Seen</option>
                    <option>Never Again</option>
                </select>
            </form>);
    }
});

var MovieList = React.createClass({
    //Pass off the movie to the correct callback function based on the button click origin
    moveMovie: function(category, movie){ 
        //console.log("Moving movie with category " + category);
        if ( category == REWATCHMOVIE ) {
            this.props.addMovieToRewatch(movie);
        } else if ( category == NOREWATCHMOVIE ) {
            this.props.addMovieToNoRewatch(movie);
        } else if ( category == ADDNEWMOVIE ) {
            this.props.addNewMovie(movie);
        }
    },
    render: function() {
        var entries = []; //Actual movie entries

        //Create a movie entry for each data entry (which is passed down)
        this.props.data.forEach(function(movie){
            //TODO: To make the most of this component - I wanted to allow new movies (With no id) to use this and movies with an id to use this
            if ( movie.id ) {
                entries.push(<MovieEntry Poster={movie.Poster} Title={movie.Title} Year={movie.Year} type={this.props.type } callback={this.moveMovie} key={movie.id} id={movie.id}/>)
                console.log(movie.Title + " has existing id " + movie.id)
            } else {
                entries.push(<MovieEntry Poster={movie.Poster} Title={movie.Title} Year={movie.Year} type={this.props.type } callback={this.moveMovie} key={id} id={id}/>)
                id = id + 1;
                console.log(movie.Title + " got new id " + id)
            }
            
        }.bind(this))

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{entries}</tbody>
            </table>
            );
    }
});

//A table item of a movie
var MovieEntry = React.createClass({
    //Given a category, serialize our movie information and pass it up to MovieList to call the correct function for moving this object.
    moveMovie: function(category){
        var movie = {Poster: this.props.Poster, Title: this.props.Title, Year: this.props.Year, type: this.props.type, key: this.props.id, id: this.props.id};
        //console.log(this.props.Title + " has entry id " + movie.id)
        this.props.callback(category, movie);
    },
    render: function() {
        return (
            <tr>
                <td><img src={this.props.Poster} width="25%" height="25%"/></td>
                <td><p className="valign">{this.props.Title}</p></td>
                <td>{this.props.Year}</td>
                <ListingButtons type={this.props.type} callback={this.moveMovie} />
            </tr>);
    }
});

//Render either a +/- or add button depending on which type of movie entry this is
//TODO: Is this the right way to dynamically change the inside of a component??
//TODO: Thoughts on my callback method? Goes from callback > moveMovie > one of the three callbacks in the MovieOrganizer
var ListingButtons = React.createClass({
    render: function() {
        if ( this.props.type == LISTEDMOVIE ) {
            return (
                <td><button className="btn btn-success" onClick={this.props.callback.bind(null, REWATCHMOVIE)}><i className="fa fa-thumbs-up"></i></button><br />
                <button className="btn btn-danger" onClick={this.props.callback.bind(null, NOREWATCHMOVIE)}><i className="fa fa-thumbs-down"></i></button></td>
            );
        } else if ( this.props.type == NEWMOVIE ) { 
            return <td><button className="btn btn-success" onClick={this.props.callback.bind(null, ADDNEWMOVIE)}><i className="fa fa-plus"></i></button></td>
        }
    }
})

//Area to add a movie to the list
var AddMovie = React.createClass({
    getInitialState: function() {
        return {
          data: []
        };
    },
    requestIMDBMovies: function(event) {
        var contextThis = this; //TODO: Binding on JQuery functions? - Not super important

        $.get( "http://www.omdbapi.com/?s=" + event.target.value.replace(" ", "%20"), function( data ) {
            console.log(data)
            
            //Catch empty responses 
            if ( data['Response'] == "False" ) {
                this.setState({
                    data: []
                });               
            } else {
                this.setState({
                    data: data['Search']
                });               
            }

        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <h3>Find More Movies</h3>
                <input type="text" className="form-control" placeholder="Type a movie title" onChange={this.requestIMDBMovies} />
                <MovieList data={this.state.data} addMovieToRewatch={this.props.addMovieToRewatch} addMovieToNoRewatch={this.props.addMovieToNoRewatch} addNewMovie={this.props.addNewMovie} type={NEWMOVIE}/>
            </div>);
    }
});


module.exports = {
    MovieOrganizer: MovieOrganizer
};