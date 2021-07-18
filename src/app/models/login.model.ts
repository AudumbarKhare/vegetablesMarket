export class Login{
    constructor(
        public registration_id:number,
        public username:string,
        public firstname:string,
        public lastname:string,
        public image_url:string,
        public email:string,
        private _token:string,
        public status:number,
        private _tokenExpirationDate:Date
    ){}

    get token(){
        if(!this._tokenExpirationDate && new Date()>this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}