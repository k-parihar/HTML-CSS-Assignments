const pokemonList = [];
const pokeLimit = 151;

for (let i = 1; i <= pokeLimit; i++) {
    spawnPokemons(i);
}

async function spawnPokemons(number, isNew = false) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const data = await response.json();
        const item = {
            id: data.id,
            name: data.name,
            photo: data.sprites.front_default,
            type: data.types[0].type.name
        };
        createCards(item, isNew);
        pokemonList.push(item);
    } catch (error) {
        console.error('Error:', error);
    }
}

function getCard(item) {
    return `
            <div class="card">
                <div class="card-title" id="pokeName" style="text-transform: capitalize;">${item.name}</div>
                <div class="card-img">
                    <img id="pokePhoto" src="${item.photo}" alt="Pokemon Image" width="200" height="200">
                </div>
                <div class="pill ${item.type}">${item.type}</div>
            </div>`;
}

function createCards(item, isNew = false) {
    const cardHtml = getCard(item);
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
    const input = document.getElementById('myInput');
    const search = input.value.toUpperCase();
    if (!search) {
        showMain(true);
        return;
    }

    showMain(false);
    const filterList = pokemonList.filter(x => x.name.toUpperCase().includes(search) || x.id == search);
    filterList.forEach(pokemon => addFilteredCard(pokemon));

    if (Number.isInteger(Number(search)) && filterList.length === 0) {
        spawnPokemons(search, true);
    }
}

function addFilteredCard(pokemon) {
    const filterHtml = document.getElementById("filtered");
    filterHtml.replaceChildren(); // Clear previous cards
    createCards(pokemon, true);
}
