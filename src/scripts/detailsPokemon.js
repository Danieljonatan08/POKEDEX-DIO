async function carregarPokemon(nomeOuId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId.toLowerCase()}`;
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    // Nome e número
    document.querySelector(".name").textContent = dados.name;
    document.querySelector(".number").textContent = `#${dados.id}`;

    // Tipos
    const tiposContainer = document.querySelector(".types");
    tiposContainer.innerHTML = "";
    dados.types.forEach(tipo => {
      const li = document.createElement("li");
      li.className = `type ${tipo.type.name}`;
      li.textContent = tipo.type.name;
      tiposContainer.appendChild(li);
    });

    // Imagem
    const imagem = document.querySelector(".detail img");
    imagem.src = dados.sprites.other["dream_world"].front_default || dados.sprites.front_default;
    imagem.alt = dados.name;

    // Altura e peso
    document.querySelector(".about .info li:nth-child(2) span:nth-child(2)").textContent = `${dados.height / 10} m`;
    document.querySelector(".about .info li:nth-child(3) span:nth-child(2)").textContent = `${dados.weight / 10} kg`;

    // Habilidades
    const habilidades = dados.abilities.map(h => h.ability.name).join(", ");
    document.querySelector(".about .info li:nth-child(4) span:nth-child(2)").textContent = habilidades;

    // Base Stats
    const stats = dados.stats;
    const statsElements = document.querySelectorAll(".baseStats .stats li");
    stats.forEach((stat, index) => {
      if (index < statsElements.length - 1) {
        statsElements[index].querySelector(".number").textContent = stat.base_stat;
        statsElements[index].querySelector(".progress").style.width = `${stat.base_stat}%`;
      }
    });

    // Total
    const total = stats.reduce((acc, stat) => acc + stat.base_stat, 0);
    document.querySelector(".baseStats .stats .total + span.number").textContent = total;

  } catch (erro) {
    console.error("Erro ao carregar Pokémon:", erro);
  }
}

// Chamada inicial
carregarPokemon("bulbasaur");

async function buscarBreeding(idOuNome) {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${idOuNome}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();

  // Gênero
  const genderRate = dados.gender_rate; // -1 = sem gênero
  const macho = genderRate >= 0 ? ((8 - genderRate) / 8) * 100 : "Sem gênero";
  const femea = genderRate >= 0 ? (genderRate / 8) * 100 : "";

  // Grupos de ovos
  const eggGroups = dados.egg_groups.map(g => g.name).join(", ");

  // Ciclo de incubação
  const eggCycle = dados.hatch_counter;

  console.log(`Gênero: Macho ${macho}% / Fêmea ${femea}%`);
  console.log(`Egg Groups: ${eggGroups}`);
  console.log(`Egg Cycle: ${eggCycle}`);
}

