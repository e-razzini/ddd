import orderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import Order                    from "../../../../domain/checkout/entity/order";
import OrderItemModel           from "./order-item.model";
import OrderModel               from "./order.model";
import OrderItem                from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements orderRepositoryInterface  {


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
          
          try {

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
          
          
          } catch (error) {
            console.log("ERROR BULKCRESTE", error)
          }
        }
        
        
        async find(id:string):Promise<Order>{

              try {
                    const order_model = await OrderModel.findOne({ where :{ id:id },include:[OrderItemModel]});
      
                    if(!order_model){
                    throw new Error("Order não encontrado");
                    }

                    console.log(order_model);
                    

                const items = order_model.items.map((item) => {
                   return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity);
                });
  
                const order = new Order(order_model.id,order_model.customer_id,items)
                return order;
              
              } catch (error) {
                console.log(error);
                
              }
        }
        
        async find_all():Promise<Order[]>{
              try {
                
                const ordersData = await OrderModel.findAll({include: [{ model: OrderItemModel, as: 'items' }]});


                 return ordersData.map((orderData) =>  {
                  
                  const itens = orderData.items.map((item) =>
                    new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                    
                  ));
                   return    new Order(orderData.id,orderData.customer_id,itens)
                });

              } catch (error) {
                 console.log(error);
                 
              } 
        }
        

}
