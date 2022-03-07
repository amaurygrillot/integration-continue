class Attack {
    constructor(
        public readonly name: string,
        public readonly power: number,
        public readonly precision: number,
        public readonly type: string,
        public readonly nature: string
    ) {}
}

export default Attack;
