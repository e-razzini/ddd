import Product from "../entity/product";
export default class ProductService {


    static increase_price(produtos:Product[],percentagem:number):void {

        produtos.forEach(produto =>{
            produto.changePrice((produto.price * percentagem) /100 + produto.price)
        });
    }

    static decremente_increase_price(produtos:Product[],percentagem:number):void {

        produtos.forEach(produto =>{
            produto.changePrice( produto.price - ((produto.price * percentagem) /100))
        });
    }
}