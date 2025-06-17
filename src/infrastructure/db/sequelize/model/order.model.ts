import { BelongsTo, Column, ForeignKey, HasMany, Model,PrimaryKey,Table } from "sequelize-typescript";
import customerModel from  "./customer.model";
import OrderItemModel from "./order-item.model";


@Table({
    tableName:"order",
    timestamps:false
})
export default class OrderModel extends Model {

   @PrimaryKey
   @Column({allowNull:false})
   declare id:string;

   @ForeignKey(() => customerModel)
   @Column({allowNull:false})
   declare customer_id:string;

   @BelongsTo(() => customerModel)
   declare  customer:customerModel;

   @HasMany(() => OrderItemModel)
   declare items:OrderItemModel[];

   @Column({allowNull:false})
   declare total:number;
}