<template>
  <h2 v-if="!pokemon" > cargando ...</h2>
  <div v-else>
    <h1>¿Cuál es este pokémon?? </h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr"/>
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import getPokemonsOptions  from '@/helpers/getPokemonOptions';

export default {
  name: 'pokemon-page',
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data(){
    return {
      pokemonArr: [],
      pokemon : null,
      showPokemon: false
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr =await getPokemonsOptions()
      const rndInt = Math.floor(Math.random()*4)
      this.pokemon = this.pokemonArr[rndInt]
    }
  },
  mounted(){
    console.log('mounted')
    this.mixPokemonArray()
    console.log('pokemons, ', this.pokemonArr )
  }
}
</script>

<style scoped>

</style>

