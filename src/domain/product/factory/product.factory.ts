import { v4 as  uuid }  from "uuid";
import Product          from "../entity/product";
import ProductInterface from "../entity/product.interface";
import Productb         from "../entity/productb";

export default class ProductFactory {

    public static create(type: string, describle: string, price: number): ProductInterface {
        if (type === "a") {
            return new Product(uuid(),describle, price);

        } else if (type === "b") {
            return new Productb(uuid(),describle, price);

        } else {
            throw new Error("Tipo de produto não suportado.");
        }
    }
}   