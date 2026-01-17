const TYPE_COLORS = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};
async function fetchResponse(nameOrId, apiUrl) {
    const response = await fetch(`${apiUrl}${nameOrId}`);
    if (!response.ok)
        throw new Error("Pokemon not found.");
    const data = await response.json();
    return data;
}
async function getPokemon(nameOrId) {
    const data = await fetchResponse(nameOrId, "https://pokeapi.co/api/v2/pokemon/");
    const description = await getPokemonDesc(nameOrId);
    const pokemon = {
        pokemonName: data["name"],
        pokemonTypes: data["types"].map((type) => type["type"]["name"]), //.map goes through each index in the array and retrieves needed info
        pokemonImageUrl: data["sprites"]["other"]["official-artwork"]["front_default"],
        pokemonDescription: description,
        pokemonHp: getPokemonStat(data["stats"], "hp"),
        pokemonAttack: getPokemonStat(data["stats"], "attack"),
        pokemonDefense: getPokemonStat(data["stats"], "defense"),
        pokemonSpecialAttack: getPokemonStat(data["stats"], "special-attack"),
        pokemonSpecialDefense: getPokemonStat(data["stats"], "special-defense"),
        pokemonSpeed: getPokemonStat(data["stats"], "speed")
    };
    return pokemon;
}
async function getPokemonDesc(nameOrId) {
    const data = await fetchResponse(nameOrId, "https://pokeapi.co/api/v2/pokemon-species/");
    const entries = data["flavor_text_entries"];
    for (const entry of entries) {
        if (entry.language.name === "en") {
            return entry.flavor_text
                .replace(/\f/g, " ")
                .replace(/\n/g, " ")
                .replace(/\s+/g, " ")
                .trim();
        }
    }
    return "No English description found.";
}
function getPokemonStat(data, statName) {
    const found = data.find(s => s?.stat?.name === statName);
    return found?.base_stat ?? 0;
}
function renderPokemon(p, container) {
    const primaryType = p.pokemonTypes[0];
    const bgColor = TYPE_COLORS[primaryType];
    container.innerHTML = `
    <div class="pokemon-container" style="background-color: ${bgColor}">
      <h2>${firstLetterInWordToUppercase(p.pokemonName)}</h2>

      <img class="pokemon-image" alt="${p.pokemonName}" src="${p.pokemonImageUrl}" />

      <div class="type-bar">
        ${p.pokemonTypes
        .map((type) => `<span class="type-badge" style="background-color: ${TYPE_COLORS[type]}">
                ${firstLetterInWordToUppercase(type)}
              </span>`)
        .join("")}
      </div>

      <p>${p.pokemonDescription}</p>

      <ul>
        <li>HP: ${p.pokemonHp}</li>
        <li>Attack: ${p.pokemonAttack}</li>
        <li>Defense: ${p.pokemonDefense}</li>
        <li>Sp. Atk: ${p.pokemonSpecialAttack}</li>
        <li>Sp. Def: ${p.pokemonSpecialDefense}</li>
        <li>Speed: ${p.pokemonSpeed}</li>
      </ul>
    </div>
  `;
}
function firstLetterInWordToUppercase(word) {
    if (word.length === 0)
        return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}
const form = document.querySelector(".search-form");
const input = document.querySelector(".pokemon-search-bar");
const display = document.querySelector(".pokemon-display");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query)
        return;
    display.textContent = "Loading...";
    try {
        const pokemon = await getPokemon(query);
        renderPokemon(pokemon, display);
    }
    catch {
        display.textContent = "Pokemon not found.";
    }
});
export {};
//# sourceMappingURL=script.js.map