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
                    <a href='#' url='${pokemon.url}' 
                    class='btn btn-primary'>Quiero Saber Mas!!!</a> 
                    </div>
                    </div>`
                    $(".card-pokemon").append(list)
                })
            },
            complete: function () {
                $('.btn-primary').click(
                    function (e) {
                        e.preventDefault();
                        $('#exampleModal').modal('show');
                        let data = ($(this).attr('url'));
                        // console.log(data);
                        $.ajax({
                            url: data,
                            method: 'GET',
                            success: function (response) {
                                let name = response.name
                                let type = response.types[0].type.name
                                let gen = response.sprites.front_shiny
                                let abi = ''
                                response.abilities.forEach(function (abilities) {
                                    abi = abi + ' ' + abilities.ability.name
                                })
                                let mov = ''
                                response.moves.forEach(function (moves, index) {
                                    if (index < 5) {
                                        mov = mov + ' ' + moves.move.name
                                    }
                                })
                                $('#exampleModalLabel').html(name)
                                $('#type').html(type)
                                $('#abilities').html(abi)
                                $('#moves').html(mov)
                                $('#gen').html(` <img src="${gen}" alt="">`)

                            }
                        })
                    }
                )
            }

        });
    }





});