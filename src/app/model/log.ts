import LogType from './logtype';

class Log {
    public defender: string;
    public damage: number;

    constructor(
       public type: LogType,
       public message: string
    ) {}
}

export default Log;
