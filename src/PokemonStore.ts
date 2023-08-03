import axios from 'axios';

let instance: PokemonStore;
export async function initializePokemonStore(staticStorageUri: string): Promise<PokemonStore> {
    instance = await PokemonStore.loadStore(staticStorageUri);
    return instance;
}

export const getPokemonStore: () => PokemonStore = () => instance;
export class PokemonStore {
    private constructor(private json: PokemonJson) {
    }

    static async loadStore(staticStorageUri: string): Promise<PokemonStore> {
        const resp = (await axios.get<PokemonJson>(staticStorageUri + "/pokemon.json",
            {
                responseType: 'json'
            })).data;
        return new PokemonStore(resp);
    }

    getPokemonsWithId(): PokemonName[] {
        return Object.keys(this.json).map<PokemonName>((key) => {
            const entry = this.json[key];
            return {
                id: entry.Id,
                name: entry.Name,
                color: entry.Color,
                types: entry.Types,
                generations: entry.Generations
            };
        });
    }

    getPokemonTypesWithId(id: number): string[] {
        return this.json[id.toString()].Types;
    }

    getStatsWithId(id: number): PokemonStat[] {
        return this.json[id.toString()].Stats.map<PokemonStat>((stat) => {
            return {
                statsName: stat.StatsName,
                value: stat.Value
            };
        });
    }

    getPokemonColor(id: number): string {
        return this.json[id.toString()].Color;
    }
}

export interface PokemonName {
    id: number,
    name: string,
    color: string,
    types: string[],
    generations: number[]
}

export interface PokemonStat {
    statsName: string,
    value: number
}

interface PokemonJson {
    [key: string]: PokemonJsonEntry;
}
interface PokemonJsonEntry {
    Id: number;
    Name: string;
    Color: string;
    Types: string[];
    Stats: PokemonJsonStat[];
    Generations: number[];
}

interface PokemonJsonStat {
    StatsName: string;
    Value: number;
}