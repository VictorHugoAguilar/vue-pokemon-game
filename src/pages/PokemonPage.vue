<template>
  <h2 v-if="!pokemon"> cargando ...</h2>
  <div v-else>
    <h1>¿Cuál es este pokémon?? </h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" :disabledAnswer="disabledAnswer" :selectedAnswer="pokemonSelected"
      @selection-pokemon="checkAnswer" />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import getPokemonsOptions from '@/helpers/getPokemonOptions';

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      disabledAnswer: false,
      message: '',
      pokemonSelected: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonsOptions()
      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer(pokemonSelectedId) {
      this.showPokemon = true
      this.showAnswer = true
      this.disabledAnswer = true
      this.pokemonSelected = pokemonSelectedId
      if (this.pokemon.id === pokemonSelectedId) {
        this.message = `Correcto, ${this.pokemon.name}`
      } else {
        this.message = `Oops, era ${this.pokemon.name}`
      }
    },
    newGame() {
      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null
      this.disabledAnswer = false
      this.pokemonSelected = ''
      this.mixPokemonArray()
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
}
</script>

<style scoped>

</style>

