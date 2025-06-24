import orderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {
//implements orderRepositoryInterface  {


        async create(entity:Order):Promise<void> {

            await OrderModel.create({
              id         : entity.id,
              customer_id: entity.customer_id,
              total      : entity.total,
              items      : entity.items.map((item)=>({
                id         :item.id,
                name       :item.name,
                price      :item.price,
                product_id :item.product_id,
                quantity   :item.quantity
             })),
             },
             {
              include:[{model:OrderItemModel}]
             }
            );
        }
        
        async updated(entity:Order):Promise<void>{

            await OrderModel.update({
              customer_id  :entity.customer_id,
              total        :entity.total
            },{
              where :{ id:entity.id}
            }
          );

          await OrderItemModel.destroy({
            where:{order_id:entity.id}
          });

          const newItem = entity.items.map((item) =>({
            id:         item.id,
            order_id:   entity.id,
            name:       item.name,
            price:      item.price,
            product_id: item.product_id,
            quantity:   item.quantity
          }));
          
          await OrderItemModel.bulkCreate(newItem);
          
          
          //try {
          //} catch (error) {
          //  console.log("ERROR BULKCRESTE", error)
          //}
        }
        
        /*
        async find(id:string):Promise<Order>{
          
        }

        async find_all():Promise<Order[]>{

        }
        */

}
