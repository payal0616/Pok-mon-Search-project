var app = angular.module('pokedexApp', []);

app.controller('PokedexController', function ($scope, $http) {
    $scope.pokemonName = "pikachu";
    $scope.featuredPokemon = [];

    $scope.fetchPokemon = function () {
        var url = "https://pokeapi.co/api/v2/pokemon/" + $scope.pokemonName.toLowerCase();
        $http.get(url).then(
            function (response) {
                $scope.pokemon = response.data;
                // Get species data for additional info
                $http.get($scope.pokemon.species.url).then(function(speciesData) {
                    $scope.pokemon.species_details = speciesData.data;
                });
            },
            function (error) {
                alert("Pokémon not found!");
                $scope.pokemon = null;
            }
        );
    };

    function loadFeaturedPokemon() {
        let randomIds = [];
        while (randomIds.length < 8) {
            let id = Math.floor(Math.random() * 150) + 1;
            if (!randomIds.includes(id)) randomIds.push(id);
        }

        randomIds.forEach(id => {
            $http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
                $scope.featuredPokemon.push(response.data);
            });
        });
    }

    $scope.showDetails = function (pokemon) {
        document.getElementById("pokemonModal").style.display = "block";
        
        // Set pokemon ID and name
        document.getElementById("modalId").innerText = "#" + pokemon.id;
        document.getElementById("modalName").innerText = pokemon.name;
        
        // Set image - prefer official artwork if available
        document.getElementById("modalImage").src = 
            (pokemon.sprites.other && pokemon.sprites.other['official-artwork']) 
            ? pokemon.sprites.other['official-artwork'].front_default 
            : pokemon.sprites.front_default;
        
        // Set types
        const typesDiv = document.getElementById("modalTypes");
        typesDiv.innerHTML = '';
        pokemon.types.forEach(typeData => {
            const typeSpan = document.createElement('span');
            typeSpan.className = 'type-badge type-' + typeData.type.name;
            typeSpan.innerText = typeData.type.name;
            typesDiv.appendChild(typeSpan);
        });
        
        // Set basic info
        document.getElementById("modalHeight").innerText = (pokemon.height / 10) + " m";
        document.getElementById("modalWeight").innerText = (pokemon.weight / 10) + " kg";
        document.getElementById("modalExperience").innerText = pokemon.base_experience || "Unknown";
        
        // Fetch species data for happiness and other details if not already available
        if (!pokemon.species_details) {
            $http.get(pokemon.species.url).then(function(response) {
                pokemon.species_details = response.data;
                document.getElementById("modalHappiness").innerText = pokemon.species_details.base_happiness || "Unknown";
            });
        } else {
            document.getElementById("modalHappiness").innerText = pokemon.species_details.base_happiness || "Unknown";
        }
        
        // Set abilities
        const abilitiesUl = document.getElementById("modalAbilities");
        abilitiesUl.innerHTML = '';
        pokemon.abilities.forEach(abilityData => {
            const abilityLi = document.createElement('li');
            abilityLi.innerText = abilityData.ability.name.replace('-', ' ');
            if (abilityData.is_hidden) {
                abilityLi.className = 'ability-hidden';
                abilityLi.innerText += ' (Hidden)';
            }
            abilitiesUl.appendChild(abilityLi);
        });
        
        // Set stats
        const statsDiv = document.getElementById("modalStats");
        statsDiv.innerHTML = '';
        
        const statClasses = {
            'hp': 'hp-stat',
            'attack': 'attack-stat',
            'defense': 'defense-stat',
            'special-attack': 'special-attack-stat',
            'special-defense': 'special-defense-stat',
            'speed': 'speed-stat'
        };
        
        const statDisplayNames = {
            'hp': 'HP',
            'attack': 'Attack',
            'defense': 'Defense',
            'special-attack': 'Sp. Attack',
            'special-defense': 'Sp. Defense',
            'speed': 'Speed'
        };
        
        pokemon.stats.forEach(statData => {
            const statRow = document.createElement('div');
            statRow.className = 'stat-row';
            
            const statName = document.createElement('div');
            statName.className = 'stat-label';
            statName.innerText = statDisplayNames[statData.stat.name] || statData.stat.name;
            
            const statBarContainer = document.createElement('div');
            statBarContainer.className = 'stat-bar-container';
            
            const statBar = document.createElement('div');
            statBar.className = 'stat-bar ' + (statClasses[statData.stat.name] || '');
            // Calculate width percentage (max stat value is typically 255)
            const statPercent = Math.min(100, (statData.base_stat / 255) * 100);
            statBar.style.width = statPercent + '%';
            
            const statValue = document.createElement('div');
            statValue.className = 'stat-value';
            statValue.innerText = statData.base_stat;
            
            statBarContainer.appendChild(statBar);
            statRow.appendChild(statName);
            statRow.appendChild(statBarContainer);
            statRow.appendChild(statValue);
            
            statsDiv.appendChild(statRow);
        });
        
        // Display limited number of moves (first 20)
        const movesDiv = document.getElementById("modalMoves");
        movesDiv.innerHTML = '';
        
        const moveLimit = 20;
        const displayMoves = pokemon.moves.slice(0, moveLimit);
        
        displayMoves.forEach(moveData => {
            const moveSpan = document.createElement('span');
            moveSpan.className = 'move-badge';
            moveSpan.innerText = moveData.move.name.replace('-', ' ');
            movesDiv.appendChild(moveSpan);
        });
        
        if (pokemon.moves.length > moveLimit) {
            const moreMovesSpan = document.createElement('span');
            moreMovesSpan.className = 'move-badge';
            moreMovesSpan.style.backgroundColor = '#dee2e6';
            moreMovesSpan.innerText = `+${pokemon.moves.length - moveLimit} more`;
            movesDiv.appendChild(moreMovesSpan);
        }
        
        // Display sprites
        const spritesDiv = document.getElementById("modalSprites");
        spritesDiv.innerHTML = '';
        
        // Filter out null sprites and create a gallery
        const validSprites = {};
        for (const [key, value] of Object.entries(pokemon.sprites)) {
            if (typeof value === 'string' && !key.includes('default') && value) {
                validSprites[key] = value;
            }
        }
        
        // Add default sprite first if exists
        if (pokemon.sprites.front_default) {
            addSpriteToGallery('default', pokemon.sprites.front_default);
        }
        
        // Add other sprites
        Object.entries(validSprites).slice(0, a = validSprites.length < 8 ? validSprites.length : 8).forEach(([key, url]) => {
            addSpriteToGallery(key, url);
        });
        
        function addSpriteToGallery(label, url) {
            const spriteContainer = document.createElement('div');
            spriteContainer.className = 'sprite-container';
            spriteContainer.title = label.replace('_', ' ');
            
            const spriteImg = document.createElement('img');
            spriteImg.src = url;
            spriteImg.alt = label;
            
            spriteContainer.appendChild(spriteImg);
            spritesDiv.appendChild(spriteContainer);
        }
    };

    // Initialize by loading featured pokemon
    loadFeaturedPokemon();
    
    // Auto-search for default pokemon on load
    $scope.fetchPokemon();
});
    