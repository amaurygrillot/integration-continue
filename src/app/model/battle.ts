import Pokemon from './pokemon';

class Battle {
    static interval;

    static getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static orderPokemonToAttack(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon[] {
        if (pokemon1.speed > pokemon2.speed) {
            return [pokemon1, pokemon2];
        }
        else if (pokemon1.speed < pokemon2.speed) {
            return [pokemon2, pokemon1];
        }
        else {
            const random = Battle.getRandomInt(2);
            return random === 0 ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
        }
    }

    static simulateFight(pokemon1: Pokemon, pokemon2: Pokemon): Promise<Pokemon> {
        return new Promise((resolve, reject) => {
            Battle.interval = setInterval(() => {
                console.log('Nouveau tour');
                const order = Battle.orderPokemonToAttack(pokemon1, pokemon2);
                console.log(`${order[0].name} commence`);
                order[0].attackTarget(order[0].attacks[0], order[1]);
                if (order[1].currentHealth <= 0) {
                    resolve(order[0]);
                    clearInterval(Battle.interval);
                    console.log(order[0].name + ' gagne !');
                    return;
                }
                order[1].attackTarget(order[1].attacks[0], order[0]);
                if (order[0].currentHealth <= 0) {
                    resolve(order[1]);
                    clearInterval(Battle.interval);
                    console.log(order[1].name + ' gagne !');
                    return;
                }
            }, 1000, pokemon1, pokemon2);
        });
    }
}

export default Battle;
