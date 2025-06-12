import Product        from "../entity/product";
import ProductService from "./product.service";

describe("Procut order service teste",() =>{

    test.skip("all products change price acrescimo",()=>{

        const produto_01 = new Product("216487632461","Produto 0001", 100);
        const produto_02 = new Product("216487632462","Produto 0002", 300);
        const produtos   = [produto_01,produto_02];

        ProductService.increase_price(produtos,100);

        expect(produto_01.price).toBe(200);
        expect(produto_02.price).toBe(600);

    });

    test.skip("all products change price desconto",()=>{

        const produto_01 = new Product("216487632461","Produto 0001", 100);
        const produto_02 = new Product("216487632462","Produto 0002", 300);
        const produtos   = [produto_01,produto_02];

        ProductService.decremente_increase_price(produtos,5);

        expect(produto_01.price).toBe(95);
        expect(produto_02.price).toBe(285);

    });

});