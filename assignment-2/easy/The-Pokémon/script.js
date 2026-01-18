let pokemonList = []
const pokeLimit = 151;
for (let i = 1; i <= pokeLimit; i++) {
    spawnPokemons(i);
}

function spawnPokemons(number, isNew = false) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(response => response.json())
        .then(data => {
            let item = {
                id: data.id,
                name: data.name,
                photo: data.sprites.front_default,
                type: data.types[0].type.name
            }
            if (isNew)
                addFilteredCard(item);
            
            createCards(item);
            pokemonList.push(item);
        })
        .catch(error => console.error('Error:', error));
}

function getCard(item) {
    return `
        <div class="card">
            <div class="card-title" id="pokeName" style="text-transform: capitalize;">${item.name}</div>
            <div class="card-img">
                <img id="pokePhoto" src="${item.photo}" alt="Pokemon Image" width="200" height="200">
            </div>
            <div class="pill ${item.type}">${item.type}</div>
        </div>`
}

function createCards(item) {
    const cardHtml = getCard(item);

    var card = document.createElement('div');
    card.innerHTML = cardHtml;

    const container = document.getElementById('container');
    container.appendChild(card);
}

function showMain(show) {
    const main = document.getElementById("container").style;
    main.setProperty('display', show ? 'flex' : 'none');

    const filterHtml = document.getElementById("filtered").style;
    filterHtml.setProperty('display', !show ? 'flex' : 'none');
}

function findPokemon() {
    var input = document.getElementById('myInput');
    var search = input.value.toUpperCase();
    if (!search) {
        showMain(true);
        return;
    }

    showMain(false);
    const filterList = pokemonList.filter(x => x.name.toUpperCase().includes(search) || x.id == search);
    filterList.forEach(pokemon => addFilteredCard(pokemon));

    if (Number.isInteger(Number(search)) && filterList.length == 0)
        spawnPokemons(search, true);
}

function addFilteredCard(pokemon) {
    const filterHtml = document.getElementById("filtered");
    filterHtml.replaceChildren();

    var filterCard = document.createElement('div');
    filterCard.innerHTML = getCard(pokemon);
    filterHtml.appendChild(filterCard);
}
