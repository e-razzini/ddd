import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import Product                    from "../../../../domain/product/entity/product";
import ProductModel               from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(entity:Product):Promise<void>{
      await ProductModel.create({id:entity.id,describle:entity.describle,price:entity.price});
    }
    async updated(entity:Product):Promise<void>{
      await ProductModel.update(
       {
        describle:entity.describle,price:entity.price
    
      },{
         where:{
            id:entity.id
         }
      });
    }
    async find(id:string):Promise<Product>{
       const find_product_one =  await ProductModel.findOne({
        where :{
            id :id
        }
       })
       return new Product(find_product_one.id,find_product_one.describle,find_product_one.price);
    }
    async find_all():Promise<Product[]>{
        const allProductModel = await ProductModel.findAll();
        return allProductModel.map((element) => new Product(element.id,element.describle,element.price));
    }
    async findByNameProduct(describle:string):Promise<Product[]>{

       const find_product_one =  await ProductModel.findAll({where :{describle :describle}});
       return find_product_one.map((element) => new Product(element.id,element.describle,element.price));
    }
}