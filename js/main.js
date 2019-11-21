const promises = [];
for (let i = 1; i <= 150; i++) {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  promises.push(fetch(url).then(res => res.json()));
}

Promise.all(promises).then(results => {
  const pokemon = results.map(data => ({
    name: data.name,
    id: data.id,
    image: data.sprites["front_default"],
    type: data.types.map(type => type.type.name).join(", "),
    abilities: data.abilities.map(ability => ability.ability.name). join(", ")
  }));

  const displayPokemon = pokemon => {
    const pokemonHTMLString = pokemon
      .map(
        pokeman =>
          `
      <li class="card">
          <img class="card-image" src="${pokeman.image}"/>
          <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
          <p class="card-subtitle">Type: ${pokeman.type}</p>
          <p class="card-subtitle">Abilities: ${pokeman.abilities}</p>
      </li>
      `
      )
      .join("");

    pokedex.innerHTML = pokemonHTMLString;
  };
  displayPokemon(pokemon);

});

function search_pokemon() { 
  let input = document.getElementById('searchbar').value.toLowerCase()
  let x = document.getElementsByClassName('card');
  let title = document.getElementsByClassName('card-title');
    
  for (i = 0; i < x.length; i++) {  
      if (!title[i].innerHTML.toLowerCase().includes(input)) { 
          x[i].style.display="none"; 

      } else { 
          x[i].style.display="list-item";  
      } 
  }
}
