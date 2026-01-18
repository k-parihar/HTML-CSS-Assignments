let pokemonList = []
const pokeLimit = 151;

function spawnPokemons(number) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(response => response.json())
        .then(data => {
            let item = {
                id: data.id,
                name: data.name,
                photo: data.sprites.front_default,
                type: data.types[0].type.name
            }
            createCards(item);
            pokemonList.push(item);
        })
        .catch(error => console.error('Error:', error));
}
for (let i = 1; i <= pokeLimit; i++) {
    spawnPokemons(i);
}

function createCards(item) {
    const container = document.getElementById("container");
    const cardHtml = getCard(item);
    var card = document.createElement('div');
    card.classList.add('rows');
    card.innerHTML = cardHtml;
    container.appendChild(card);
}

function getCard(item){
    return `
        <div class="card">
            <div class="card-title" id="pokeName" style="text-transform: capitalize;">${item.name}</div>
            <div class="card-img">
            <img id="pokePhoto" src="${item.photo}" alt="Pokemon Image" width="200" height="200">
            </div>
            <div class="pill ${item.type}">${item.type}</div>
        </div>`
}

function findPokemon(){
    const filterHtml = document.getElementById("filtered");
    filterHtml.replaceChildren();

    var input = document.getElementById('myInput');
	var search = input.value.toUpperCase();
    if(!search){
        document.getElementById("container").style.setProperty('display', 'flex');
        return;
    }

    document.getElementById("container").style.setProperty('display', 'none');
    const filterList = pokemonList.filter(x=> x.name.toUpperCase().includes(search) || x.id == search);
    filterList.forEach(pokemon => {
        console.log(pokemon)
        var filterCard = document.createElement('div');
        filterCard.innerHTML = getCard(pokemon);
        filterHtml.appendChild(filterCard);
    });
}