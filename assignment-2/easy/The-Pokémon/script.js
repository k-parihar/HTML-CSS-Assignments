const pokemonList = [];
const pokeLimit = 151;
async function initPokemonList(){
    for (let i = 1; i <= pokeLimit; i++) {
        let pokemon = await spawnPokemons(i);
        createCards(pokemon, true);
        pokemonList.push(pokemon);
    }
}
initPokemonList();

async function spawnPokemons(id, isNew = false) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const response = await fetch(url);
    const data = await response.json();
    const pokemon = {
        id: data.id,
        name: data.name,
        photo: data.sprites.front_default,
        type: data.types[0].type.name
    };
    return pokemon;
}

function getCard(pokemon) {
    return `
            <div class="card">
                <div class="card-title" id="pokeName" style="text-transform: capitalize;">${pokemon.name}</div>
                <div class="card-img">
                    <img id="pokePhoto" src="${pokemon.photo}" alt="Pokemon Image" width="200" height="200">
                </div>
                <div class="pill ${pokemon.type}">${pokemon.type}</div>
            </div>`;
}

function createCards(pokemon, isNew = false) {
    const cardHtml = getCard(pokemon);
    const card = document.createElement('div');
    card.innerHTML = cardHtml;
    const targetContainer = isNew ? document.getElementById("filtered") : document.getElementById('container');
    targetContainer.appendChild(card);
}

function showMain(show) {
    const main = document.getElementById("container").style;
    main.display = show ? 'flex' : 'none';
    const filterHtml = document.getElementById("filtered").style;
    filterHtml.display = !show ? 'flex' : 'none';
}

function findPokemon() {
    const filterHtml = document.getElementById("filtered");
    filterHtml.replaceChildren(); // Clear previous cards

    const input = document.getElementById('myInput');
    const search = input.value.toUpperCase();
    if (!search) {
        showMain(true);
        return;
    }

    showMain(false);
    const filterList = pokemonList.filter(x => x.name.toUpperCase().includes(search) || x.id == search);
    filterList.forEach(pokemon => createCards(pokemon, true));

    if (Number.isInteger(Number(search)) && filterList.length === 0) {
        spawnPokemons(search, true);
    }
}
