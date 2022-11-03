import {shallowMount} from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";

describe('PokemonOptions components', () => {

	let wrapper;

	beforeEach( () => {
		wrapper = shallowMount(PokemonOptions, {
			props: {
				pokemons
			}
		})
	});

	test('debe de hacer match con el snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('debe de mostrar las 4 opciones correctamente', () => {
		const liTags = wrapper.findAll('li');
		expect(liTags.length).toBe(4);
		expect(liTags[0].text()).toBe('bulbasaur');
		expect(liTags[1].text()).toBe('ivysaur');
		expect(liTags[2].text()).toBe('venusaur');
		expect(liTags[3].text()).toBe('charmander');
	});

	test('debe de emitir "selection" con sus respectivos parámetros al hacer click en el elemento', () => {
		const [ li1, li2, li3, li4 ] = wrapper.findAll('li');
		li1.trigger('click');
		li2.trigger('click');
		li3.trigger('click');
		li4.trigger('click');
		expect(wrapper.emitted('selection-pokemon').length).toBe(4)
		expect(wrapper.emitted('selection-pokemon')[0]).toStrictEqual(["1"])
	});

	test('debe de emitir "selection" con sus respectivos parámetros al hacer click en el elemento y no hacer nada en la segunda vez', () => {
		const [ li1 ] = wrapper.findAll('li');
		li1.trigger('click');
		li1.trigger('click');
		expect(wrapper.emitted('selection-pokemon').length).toBe(2)
		expect(wrapper.emitted('selection-pokemon')[0]).toStrictEqual(["1"])
	});


	test('debe de haberse seleccionado una de las opciones y se puede ejecutar el click', () => {
		wrapper = shallowMount(PokemonOptions, {
			props: {
				pokemons,
				selectedAnswer: "1",			
			}
		});
		const liTag = wrapper.find('li');
		liTag.trigger('click');
		expect(wrapper.emitted('selection-pokemon').length).toBe(1)
		expect(liTag.classes('selected')).toBe(true);
	});

	test('debe de haberse seleccionado una de las opciones', () => {
		wrapper = shallowMount(PokemonOptions, {
			props: {
				pokemons,
				selectedAnswer: "1",			
				disabledAnswer: true
			}
		});
		const [li1, li2, li3, li4 ] = wrapper.findAll('li');
		li1.trigger('click');
		expect(wrapper.emitted('selection-pokemon')).toBe(undefined);
		expect(li1.classes('answered')).toBe(true);
		expect(li2.classes('answered')).toBe(true);
		expect(li3.classes('answered')).toBe(true);
		expect(li4.classes('answered')).toBe(true);
	});


});
