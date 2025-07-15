import { Column, Model,PrimaryKey,Table } from "sequelize-typescript";

@Table({
    tableName:"customer",
    timestamps:false
})
export default class customerModel extends Model {

   @PrimaryKey
   @Column
   declare id:string;

   @Column({allowNull:false})
   declare name:string;

   @Column({allowNull:false})
   declare active:boolean;

   @Column({allowNull:false})
   declare rewardPoints:number;

   @Column({allowNull:false})
   declare zip_code:string;

   @Column({allowNull:false})
   declare country:string;

   @Column({allowNull:false})
   declare city:string;   

   @Column({allowNull:false})
   declare street:string;   


}