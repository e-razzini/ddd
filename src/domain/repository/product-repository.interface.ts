import RepositoryInterface from "./repository-interface";
import Product             from "../entity/product";

export default interface ProductRepositoryInterface  extends RepositoryInterface<Product>{
    findByNameProduct(describle:string): Promise<Product[]>;
}