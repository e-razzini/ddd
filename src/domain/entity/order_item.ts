export default class OrderItem {

    private _id         :string;
    private _product_id :string;
    private _quantity   :number;
    private _name       :string;
    private _price      :number;

    constructor(id:string,name:string,price:number,product_id:string,qddt:number){
        this._id         = id;
        this._name       = name;
        this._price      = price;
        this._product_id = product_id;
        this._quantity   = qddt;
        this.validate_order_item()
    }

    get product_id(){
        return this._product_id;   
    }

    get price () {
        return this._price * this._quantity;
    }
    get id(){
        return this._id;   
    }
    get name(){
        return this._name;   
    }
    
    get quantity(){
        return this._quantity;   
    }

    validate_order_item(){

        if(this._quantity <= 0){ throw new Error("Quantidade de item e Zero");}
    }
}