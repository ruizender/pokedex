$(document).ready(function () {
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/'

    $('#nextTo').click(function (e) {
        e.preventDefault();
        $(".card-pokemon").html(" ");
        fetchPokemon();
    })

    function dataPokemon(page) {
        console.log(page)
        // $.ajax({
        //     url: page,
        //     method: 'GET',
        //     success: function (response) {
        //         console.log(response)
        //     }

        // })
    }

    fetchPokemon();

    function fetchPokemon() {
        $.ajax({
            url: endpoint,
            method: 'GET',
            success: function (response) {
                endpoint = response.next;
                console.log(endpoint);
                response.results.forEach(function (pokemon) {
                    let list = `<div class='card'>
                    <div class='card-body'> 
                    <h5 class='card-title'>${pokemon.name}</h5>
                    <a href='#' data-toggle='modal' onclick="dataPokemon('${pokemon.url}')"
                    data-target='#exampleModal' 
                    class='btn btn-primary'>Quiero Saber Mas!!!</a> 
                    </div>
                    </div>`
                    $(".card-pokemon").append(list)
                })
            }
        });

    }



});