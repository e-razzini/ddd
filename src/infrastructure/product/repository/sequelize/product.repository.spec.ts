import { Sequelize }     from "sequelize-typescript";
import ProductModel      from "./product.model";
import Product           from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("repositorio de produto",() =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect:'sqlite',
            storage :':memory:',
            logging :false,
            sync:{force:true}
        });

         sequelize.addModels([ProductModel]);
         await sequelize.sync();
    });
        
    afterEach(async() =>{
            await sequelize.close();
    }); 

    test("create Product", async () => {
        
        const productRepository  = new ProductRepository();

        const product = new Product("8979879789","Notebook Dell c200",4999.99);
        await productRepository.create(product);
        
        const product_model = await ProductModel.findOne({where:{id:"8979879789"}})
        expect(product_model.toJSON()).toStrictEqual({
            id:"8979879789",
            describle:"Notebook Dell c200",
            price: 4999.99
        });

    });

    test("Update a Product", async ( ) =>{

        const productRepository_2 = new ProductRepository();
        const product_2           = new Product("123","Notebook Ace v510",49.90);
        await productRepository_2.create(product_2);

        product_2.changeDescrible("Acer v810");
        product_2.changePrice(5850.00);

        await productRepository_2.updated(product_2);

        const product_model_updated = await ProductModel.findOne({where:{id:"123"}})
        expect(product_model_updated.toJSON()).toStrictEqual({
            id:"123",
            describle:"Acer v810",
            price: 5850.00
        });

    });


    test("find a Product", async () => {

       const prodRepository = new ProductRepository();
       const product           = new Product("123","Mouse Logitecht",299.99);
       await prodRepository.create(product);

       const productModel = await ProductModel.findOne({where:{ id: "123" }});

       const findProduct  = await prodRepository.find("123");

       expect(productModel.toJSON()).toStrictEqual({
        id:findProduct.id,
        describle:findProduct.describle,
        price:findProduct.price
       });

    });

    test("find all Product", async () => {

       const prodRepository = new ProductRepository();
       const product           = new Product("123","Mouse Logitecht",299.99);
       await prodRepository.create(product);

       const product_2   = new Product("456","Mouse Asus",250.99);
       await prodRepository.create(product_2);
       const all_products = await prodRepository.find_all();
       const products     =[product,product_2];
       expect(products).toEqual(all_products);

    });


    test("find by describle Product", async () => {

       const prodRepository    = new ProductRepository();
       const product           = new Product("123","Mouse Logitecht",299.99);
       await prodRepository.create(product);
       
       const product_2         = new Product("456","Mouse Logitecht",280.99);
       await prodRepository.create(product_2);

       const products =[product,product_2];
       const findAll_product = await prodRepository.findByNameProduct("Mouse Logitecht");

       expect(products).toEqual(findAll_product);

    });
});