import { shallowMount } from "@vue/test-utils";
import PokemonPage from '@/pages/PokemonPage';
import {pokemons} from '../mocks/pokemons.mock';

describe('PokemonPage Component', () => {

	let wrapper, mixPokemonArraySpy;

	beforeEach(() => {
		mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
		wrapper = shallowMount(PokemonPage);

	});

	test('debe de hacer match con el snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot();	
	});

	test('debe de llamar mixPokemonArray al montar', () => {
		const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
		const wrapper = shallowMount(PokemonPage);
		expect(mixPokemonArraySpy).toHaveBeenCalled()
	});	

	test('debe de hacer match con el snapshot cuando cargan los pokemons',  () => {
		const wrapper = shallowMount(PokemonPage, {
			data(){
				return {
	    		pokemonArr: pokemons,
      		pokemon: pokemons[0],
      		showPokemon: false,
      		showAnswer: false,
      		disabledAnswer: false,
      		message: '',
      		pokemonSelected: ''
				}
			}
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
		const wrapper = shallowMount(PokemonPage, {
			data(){
				return {
	    		pokemonArr: pokemons,
      		pokemon: pokemons[0],
      		showPokemon: false,
      		showAnswer: false,
      		disabledAnswer: false,
      		message: '',
      		pokemonSelected: ''
				}
			}
		});
		
		const pokemonPicture = wrapper.find('pokemon-picture-stub');
		expect(pokemonPicture.exists()).toBeTruthy();
		expect(pokemonPicture.attributes('pokemonid')).toBe("1");

		const pokemonOptions = wrapper.find('pokemon-options-stub');
		expect(pokemonOptions.exists()).toBeTruthy();
		expect(pokemonOptions.attributes('pokemons')).toBeTruthy(); 
	});

	test('pruebas con checkAnswer, respuesta correcta', async () => {
			const wrapper = shallowMount(PokemonPage, {
			data(){
				return {
	    		pokemonArr: pokemons,
      		pokemon: pokemons[0],
      		showPokemon: false,
      		showAnswer: false,
      		disabledAnswer: false,
      		message: '',
      		pokemonSelected: ''
				}
			}
		});

		await wrapper.vm.checkAnswer("1");
		const h2Tag = wrapper.find('h2');
		expect(h2Tag.exists()).toBeTruthy();
		expect(h2Tag.text()).toEqual(`Correcto, ${pokemons[0].name}`)
		expect(wrapper.vm.showPokemon).toBe(true)
		expect(wrapper.vm.showAnswer).toBe(true)
	});

	test('pruebas con checkAnswer, respuesta incorrecta', async () => {
			const wrapper = shallowMount(PokemonPage, {
			data(){
				return {
	    		pokemonArr: pokemons,
      		pokemon: pokemons[0],
      		showPokemon: false,
      		showAnswer: false,
      		disabledAnswer: false,
      		message: '',
      		pokemonSelected: ''
				}
			}
		});

		await wrapper.vm.checkAnswer("2");
		expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)
		expect(wrapper.vm.showPokemon).toBe(true)
		expect(wrapper.vm.showAnswer).toBe(true)
	});

});
