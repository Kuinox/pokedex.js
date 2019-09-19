import initSqlJs from 'sql.js';
import axios from 'axios';
import { SqlJs } from 'sql.js/module';
import { PokemonName, PokemonStat } from './PokeTypes';

let instance: PokemonStore;
export async function initializePokemonStore(): Promise<PokemonStore> {
    instance = await PokemonStore.loadStore();
    return instance;
}
export const getPokemonStore: () => PokemonStore = () => instance;
export class PokemonStore {
    private db: SqlJs.Database;

    private constructor(db: SqlJs.Database) {
        this.db = db;
        console.log(this.db.exec("select id, identifier from pokemon")[0].values);
    }

    getPokemonsWithId(): PokemonName[] {
        return this.db.exec("select id, identifier from pokemon")[0]
            .values.map<PokemonName>((s) => {
                return {
                    id: s[0] as number,
                    name: s[1] as string
                };
            });
    }

    getPokemonTypesWithId(id: number) {
        return this.db.exec("select" +
            " type_names.name" +
            " from pokemon" +
            " left join pokemon_types" +
            " on pokemon.id = pokemon_types.pokemon_id" +
            " left join type_names" +
            " on type_names.type_id = pokemon_types.type_id" +
            " where pokemon.id = " + id + " and type_names.local_language_id = 9")[0]
            .values.map<String>((s) => s[0] as string);
    }

    getStatsWithId(id: number) {
        return this.db.exec("select" +
            " stat_names.name, pokemon_stats.base_stat" +
            " from pokemon" +
            " left join pokemon_stats" +
            " on pokemon.id = pokemon_stats.pokemon_id" +
            " left join stat_names" +
            " on stat_names.stat_id = pokemon_stats.stat_id" +
            " where pokemon.id = "+ id +" and stat_names.local_language_id = 9")[0]
            .values.map<PokemonStat>((s) => {
                return {
                    statsName: s[0] as string,
                        value: s[1] as number
                }
            });
    }

    static async loadStore(): Promise<PokemonStore> {
        const config = {
            locateFile: (filename: string) => process.env.PUBLIC_URL + "/" + filename
        }
        let results = await Promise.all([
            axios.get<Uint8Array>(process.env.PUBLIC_URL + "/data/veekun-pokedex.sqlite",
                {
                    responseType: "arraybuffer"
                }),
            initSqlJs(config)]);
        return new PokemonStore(new results[1].Database(new Uint8Array(results[0].data)));
    }
}