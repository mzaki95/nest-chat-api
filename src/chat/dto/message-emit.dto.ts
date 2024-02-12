export class MessageEmitDto {
    constructor(
        public id: number,
        public from: string,
        public content: string,
        public date: Date,
        public self: boolean,
    ){}
}
