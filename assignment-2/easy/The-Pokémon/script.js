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

async function spawnPokemons(id) {
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

function createCards(pokemon) {
    const cardHtml = getCard(pokemon);
    const card = document.createElement('div');
    card.innerHTML = cardHtml;
    const targetContainer = document.getElementById('container');
    targetContainer.appendChild(card);
}

function findPokemon() {
    const input = document.getElementById('myInput');
    const search = input.value.toUpperCase();
    const isExist = pokemonList.some(pokemon => pokemon.id === Number(search) || pokemon.name.toUpperCase() === search);
    
    if (isExist) {
        const cards = document.getElementById('container').getElementsByClassName('card');
        for (i = 0; i <= cards.length; i++) {
            var txtValue = cards[i]?.children[0]?.textContent;
            if(txtValue){
                const check = txtValue.toUpperCase()?.indexOf(search) > -1 || Number(search) == i;
                cards[i].style.display = check ? "" : "none";
            }
        }
        return;
    }

    createFilteredPokemon(search);
}

async function createFilteredPokemon(search) {
    if (pokemonList.some(pokemon => pokemon.id === Number(search))) {
        return;
    }

    const pokemon = await spawnPokemons(Number(search));
    createCards(pokemon, true);
}