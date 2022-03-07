import Attack from './attack';

export interface Result {
    results: PokemonUrl[];
}

export interface PokemonUrl {
    name: string;
    url: string;
}

export interface PokemonApi {
    id: number;
    name: string;
    sprites: {
      versions: {
        'generation-v': {
          'black-white': {
            animated: {
              back_default: string,
              front_default: string
            }
          }
        }

        }
    };
    moves: [
      {
        move: {
          name: string,
          url: string
        }
      }
    ];
    stats: Stat[];
    attacks: Attack[];
}

export interface Move{
  names: [
    {
      language: {
        name: 'fr',
        url: string
      },
      name: string
    }
  ];
  power: number;
  accuracy: number;
  type: {
    name: string
  };
  meta: {
    category: {
      name: string
    }
  };

}

interface Stat {
    base_stat: number;
    stat: {
        name: string,
  };
}
