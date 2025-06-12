export default class Product {

 
    private _id       :string;
    private _describle: string;
    private _price    : number;

    constructor(id:string,describle:string,price:number){

        this._id        = id;
        this._describle = describle;
        this._price     = price;
        this.validate_product();
    }

    get id():string {
        return this._id;
    }
    get describle():string {
        return this._describle;
    }
    get price():number {
        return this._price;
    }

    validate_product(): boolean{

        if(this._id.length ===0){ throw new Error("Id de produdo é Obrigatorio.");}
        if(this._describle.length ===0){ throw new Error("Descrição de produdo é Obrigatorio.");}
        if(this._price <=0){ throw new Error("Preço de produdo é Obrigatorio.");}
        return true;
    }

    changeDescrible(name:string):void{
        this._describle = name;
        this.validate_product();
    }

    changePrice(price:number):void{
        this._price = price;
        this.validate_product();
    }
}