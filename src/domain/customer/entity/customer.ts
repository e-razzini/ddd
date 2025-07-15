import Address from "../value-object/address.js";

export default class Customer {
 
  private _id:string;
  private _name:string;
  private _address!: Address;
  private _active :boolean = true;
  private _rewardPoints :number = 0;

  constructor(id:string,name:string){
    this._id     = id;
    this._name   = name;
    this.validate();
  }
  
  changeName(name:string){

    let name_sobre_nome = name.split(" ");
    let nome = name_sobre_nome[0];
    let sobre_nome = name_sobre_nome[1];

    if(nome == null || name =="" || nome.length === 0){
       return "Error nome e sobre nome é Obrigatorio.";
    }

    if( sobre_nome == null || sobre_nome =="" || sobre_nome.length === 0){
       return "Error nome e sobre nome é Obrigatorio.";
    }
    this.validate();
    this.name = name;
  }

  validate(){
   
    if(this._id.length === 0){
      throw new Error("Id e obrigatorio.");
      
    }

    if(this._name.length === 0){
      throw new Error("Nome e Obrigatorio.");
      
    }
  }

  activate(){

    if(this._address === undefined){
      throw new Error("Endereço e obrigatorio.");
      
    }
    this._active = true;
  }
  deactivate(){
    this._active =false;
  }


  setAddress(address:Address){
    this._address = address;
  }

  getAddress(): Address {
    if(this._address === undefined){
      throw new Error("Endereço e obrigatorio.");
    }
    return this._address;
  }

  AddRewardPoints(points:number) : number {
    return this._rewardPoints += points ; 
  }

  get rewardPoints() : number {
    return this._rewardPoints; 
  }
  get id() : string {
    return this._id; 
  }
  
  get name():string{
    return this._name;
  }

  IsActive(): boolean{
    return this._active;
  }

  get address() {
    return this._address;
  }

  set id(id: string) {
    this._id = id; 
  }
  
  set name(name:string){
    this._name =name;
  }

  set address(address: Address) {
    this.address =address;
  }
  
  toJson(){
    return {
      
    };
  }
}