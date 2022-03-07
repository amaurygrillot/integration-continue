import Attack from './attack';

class Pokemon {
    public currentHealth: number;

    constructor(
        public name: string,
        public level: number = 1,
        public maxHealth: number = 1,
        public attack: number = 1,
        public defense: number = 1,
        public speed: number = 1,
        public imageFront: string = '',
        public imageBack: string = '',
        public attacks: Attack[] = []
    ) {
        this.currentHealth = maxHealth;
    }

    public attackTarget(attack: Attack, target: Pokemon): string {
        console.log(`${this.name} attaque ${target.name} avec ${attack.name}`);
        return `${this.name} attaque ${target.name} avec ${attack.name}`;
    }

    public takeDamages(attack: Attack, attacker: Pokemon): number {
        const damages: number =
          Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * attacker.attack * attack.power / this.defense) / 50) + 2;
        this.currentHealth = this.currentHealth - damages;
        console.log(`${this.name} prends ${damages} de dommages`);
        return damages;
    }

    public setHealth(baseStat: number) {
        this.maxHealth = Math.floor((2 * baseStat) * this.level / 100 + this.level + 10);
        this.currentHealth = this.maxHealth;
    }

    public setAttack(baseStat: number) {
        this.attack = Math.floor((2 * baseStat) * this.level / 100 + 5);
    }

    public setDefense(baseStat: number) {
        this.defense = Math.floor((2 * baseStat) * this.level / 100 + 5);
    }

    public setSpeed(baseStat: number) {
        this.speed = Math.floor((2 * baseStat) * this.level / 100 + 5);
    }
}

export default Pokemon;
