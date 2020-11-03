$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    let apiKey = '2599746f';
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=` + searchText)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output+= `
            <div class=" col-md-3>
                <div class="well text-center>
                
                <a href="#"><img class="poster" onclick="movieSelected('${movie.imdbID}');" src="${movie.Poster}"></a>
                <h5 class="filmTitle">${movie.Title}</h5>
                <a id="btn" onclick="movieSelected('${movie.imdbID}');" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}


function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie (){
    let movieId = sessionStorage.getItem('movieId');
    let apiKey = '2599746f';
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=` + movieId)
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
        <div class="row">
        <div class="well">
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" class="thumbnail">
        <div class="movieinfo">
        <ul class="list-group">
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
        </ul>
    </div>
            <h3>Plot:</h3>
            <div class=>
                <p>${movie.Plot}</p>
            </div>
            
            <hr>

            
        </div>
    </div>
    <div>
    <a type="button" class="btn btn-primary" target="blank" href="https://www.imdb.com/title/${movie.imdbID}">View IMDB</a>
    <a type="button" href="index.html" class="btn btn-default">Go Back To Search</a>
    </div>
        `;

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}