let id = 0;
const urlBase = "https://pokeapi.co/api/v2/pokemon/";
let isfemaleactive = false;
let isshinyactive = false;

function index() {
    id = 0;

    isfemaleactive = false;
    isshinyactive = false;

    const defaultImg = "pokeball.png";
    document.getElementById('id').innerText = '';
    document.getElementById('pokeimg').setAttribute('src', defaultImg);
    document.getElementById('nom').innerHTML = '';
    document.getElementById('tipus').innerHTML = '';
    document.getElementById('altura').innerHTML =  '';
    document.getElementById('pes').innerHTML =  '';
    document.getElementById('habilitats').innerHTML = '';
}

function next() {
    if (id === 1010) {
        id = 1;
    } else {
        id++;
    }
    fetchPokemon();
}

function previous() {

    if (id > 1) {
        id--;
    } else {
        id = 1010;
    }
    fetchPokemon();
}

function nextTen() {
    if (id + 10 > 1010) {
        id = 10 - (1010 - id);
    } else {
        id += 10;
    }
    fetchPokemon();
}

function previousTen() {

    if (id - 10 < 1) {
        id = 1010 - (10 - id);
    } else {
        id -= 10;
    }
    fetchPokemon();
}

function fetchPokemon() {

    let url = urlBase + id;

    isfemaleactive = false;
    isshinyactive = false;

    fetch (url)
        .then( x => {
            return x.json();
        })
    .then( y => {
        let types = '';
        y.types.forEach(el => {
            types += el.type.name + ', ';
        });
        types = types.slice(0, -2);
        let abilities = '';
        y.abilities.forEach(el => {
            abilities += el.ability.name + ', ' ;
        });
        abilities = abilities.slice(0, -2);

        document.getElementById('id').innerText = id;
        document.getElementById('pokeimg').setAttribute('src', y.sprites.front_default);
        document.getElementById('nom').innerHTML = '<b>Name: </b>' + y.name;
        document.getElementById('tipus').innerHTML = '<b>Type: </b>' + types;
        document.getElementById('altura').innerHTML =  '<b>Height: </b>' + y.height + ' dm.';
        document.getElementById('pes').innerHTML = '<b>Weight: </b>' + y.weight + ' gr.';
        document.getElementById('habilitats').innerHTML = '<b>Abilities: </b>' + abilities;
    })
}

function male() {
    let url = urlBase + id;
    fetch(url)
        .then( x => {
            return x.json();
        })
        .then( y => {
            if (isshinyactive) {
                document.getElementById('pokeimg').setAttribute('src', y.sprites.front_shiny);
                isfemaleactive = false;
            } else if (!isshinyactive) {
                document.getElementById('pokeimg').setAttribute('src', y.sprites.front_default);
                isfemaleactive = false;
            }
        })
}

function female() {
    let url = urlBase + id;
    fetch(url)
        .then( x => {
            return x.json();
        })
        .then( y => {
            if (isshinyactive && y.sprites.front_female){
                document.getElementById('pokeimg').setAttribute('src', y.sprites.front_shiny_female);
                isfemaleactive = true;
            }
            else if (!isshinyactive && y.sprites.front_female) {
                document.getElementById('pokeimg').setAttribute('src', y.sprites.front_female);
                isfemaleactive = true;
            } else {
                isfemaleactive = false;
            }
        })
}

function norm() {
    let url = urlBase + id;
    fetch(url)
        .then( x => {
            return x.json();
        })
        .then( y => {
            if (isfemaleactive) {
            document.getElementById('pokeimg').setAttribute('src', y.sprites.front_female);
            isshinyactive = false;
            } else {
            document.getElementById('pokeimg').setAttribute('src', y.sprites.front_default);
            isshinyactive = false;
            }
        });
}

function shiny() {
    let url = urlBase + id;
    fetch(url)
        .then( x => {
            return x.json();
        })
        .then( y => {
            if (isfemaleactive && y.sprites.front_shiny_female) {
                document.getElementById('pokeimg').setAttribute('src', y.sprites.front_shiny_female);
                isshinyactive = true;
            } else if (!isfemaleactive && y.sprites.front_shiny) {
                document.getElementById('pokeimg').setAttribute('src', y.sprites.front_shiny);
                isshinyactive = true;
            } else {
                isshinyactive = false;
            }
})
}