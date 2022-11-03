import getPokemonsOptions, { getPokemons, getPokemonNames } from '@/helpers/getPokemonOptions';

describe('getPokemonOptions helpers', () => {
	test('debe de regresar un arreglo de numeros', () => {
		const pokemons = getPokemons()
		expect(pokemons.length).toBe(650)
		expect(pokemons[0]).toBe(1)
		expect(pokemons[500]).toBe(501)
		expect(pokemons[649]).toBe(650)
	});

	test('debe de retornar un arreglo de 4 elementos con nombre de pokemon', async () => {
		const pokemons = await getPokemonNames([1,2,3,4])
		expect(pokemons).toStrictEqual([{"id": "1", "name": "bulbasaur"}, {"id": "2", "name": "ivysaur"}, {"id": "3", "name": "venusaur"}, {"id": "4", "name": "charmander"}])
	});

	test('getPokemonOptions debe de retornar un arreglo mezclado', async () => {
		const pokemons = await getPokemonsOptions()
		expect(pokemons.length).toBe(4)
		expect(pokemons).toEqual([
			{name: expect.any(String), id: expect.any(String)},
			{name: expect.any(String), id: expect.any(String)},
			{name: expect.any(String), id: expect.any(String)},
			{name: expect.any(String), id: expect.any(String)}
		])
	});
});
