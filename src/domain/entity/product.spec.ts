import Product from "./product";

describe("Produto test",() =>{

    test.skip("Product id",()=>{

        expect(() => {
            const produto = new Product("","Notebook acer V",4500.00);
        }).toThrowError("Id de produdo é Obrigatorio.");

    });

    test.skip("Product nome",()=>{

        expect(() => {
            const produto = new Product("146832432","",4500.00);
        }).toThrowError("Descrição de produdo é Obrigatorio.");

    });

    test.skip("Product price",()=>{

        expect(() => {
            const produto = new Product("146832432","Notebook acer V",0);
        }).toThrowError("Preço de produdo é Obrigatorio.");

    });

    test.skip("Product change describle",()=>{

        const produto = new Product("146832432","Notebook acer V",4500.00);
        produto.changeDescrible("Notebook acer V15");
        expect(produto.describle).toBe("Notebook acer V15");

    });

    test.skip("Product change Price",()=>{

        const produto = new Product("146832432","Notebook acer V",4500.00);
        produto.changePrice(5200.00);
        expect(produto.price).toBe(5200.00);

    });

});