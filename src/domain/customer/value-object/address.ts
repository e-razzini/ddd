export default class Address {

    _zip_code :string;
    _country  :string;
    _city     :string;
    _street   :string;

    constructor(street:string,num:string,city:string,country:string){

        this._zip_code  = num;
        this._street    = street;
        this._city      = city;
        this._country   = country;
        this.validade_address();
    }

    get zip_code():string {
        return this._zip_code
    }
    get city():string {
        return this._city
    }
    get country():string {
        return this._country
    }
    get street():string {
        return this._street
    }

    validade_address(){


        if(this._street.length === 0){
            throw new Error("Endereço é obrigatorio");
            
        }
        if(this._zip_code.length === 0){
            throw new Error("Numero é obrigatorio");
            
        }
        if(this._city.length === 0){
            throw new Error("Cidade é obrigatorio");
            
        }
        if(this._country.length === 0){
            throw new Error("Paiz é obrigatorio");
            
        }
    }

    toStringAddress(){
        return `${this._street} ${this._zip_code} ${this._city} ${this._country}`;
    }
}