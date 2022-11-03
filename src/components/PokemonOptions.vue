<template>
  <div class="options-container">
    <ul>
      <li :class="{ 'answered': isAnswered, 'selected': getSelected(pokemon.id) }" v-for="pokemon in pokemons"
        :key="pokemon.id" @click="returnAnswer(pokemon.id)"> {{
    pokemon.name
        }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      requiered: true
    },
    disabledAnswer: {
      type: Boolean,
      requiered: true,
      default: false
    },
    selectedAnswer: {
      type: String,
      value: ''
    },
  },
  data() {
    return {
      isAnswered: this.disabledAnswer,
      selected: this.selectedAnswer,
    }
  },
  methods: {
    returnAnswer(pokemonId) {
      if (this.disabledAnswer) {
        return;
      }
      this.$emit('selection-pokemon', pokemonId)
    },
    getSelected(pokemonId) {
      return pokemonId === this.selectedAnswer
    }
  },
  watch: {
    selectedAnswer() {
      this.isAnswered = this.disabledAnswer;
    }
  }
}
</script>

<style scoped>
/* Pokemon Options */
ul {
  list-style-type: none;
}

li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.answered {
  cursor: default;
}

.selected {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
