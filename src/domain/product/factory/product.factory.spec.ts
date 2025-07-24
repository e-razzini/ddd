import ProductFactory from "./product.factory";

describe("Product fatory", () => {

         
    test("should create a product type A", () => {

        const product = ProductFactory.create("a","Product A", 100);

        expect(product.id).toBeDefined();
        expect(product.describle).toBe("Product A");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("Product");
    });   

    test("should create a product type B", () => {

        const product = ProductFactory.create("b","Product B", 101);

        expect(product.id).toBeDefined();
        expect(product.describle).toBe("Product B");
        expect(product.price).toBe(202);
        expect(product.constructor.name).toBe("Productb");
    });       


})