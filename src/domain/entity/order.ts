import OrderItem from "./order_item";

export default class Order {

    private _id          : string;
    private _customer_id : string;
    private _items       : OrderItem[] =[];
    private _total       : number;

    constructor (id:string,customerID:string,items:OrderItem[]){
        this._customer_id = customerID;
        this._id          = id;
        this._items       = items;
        this._total       = this.total_price();
        this.validate_order();
    }

    get id(){
        return this._id;
    }
    get total(){
        return this._total;
    }

    get items(){
        return this._items;
    }

    get customer_id(){
        return this._customer_id;
    }
    validate_order(): boolean{
     
        if(this._id.length === 0){
            throw new Error("Id de ordem é obrigatorio");
        }
        if(this._customer_id.length === 0){
            throw new Error("Id de customer é obrigatorio");
        }
        if(this._items.length === 0){
            throw new Error("Items é obrigatorio");
        }

        if(this._items.some(item => item.quantity <= 0)){
             throw new Error("Quantidade de item e Zero");
        }
        return true;
    }

    total_price(): number {
        return this._items.reduce((acc,item) =>  acc + item.price,0);
    }

}