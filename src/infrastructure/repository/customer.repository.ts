import Customer from "../../domain/entity/customer";
import customerModel from "../db/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface  {


        async create(entity:Customer):Promise<void>{
            await customerModel.create({
                id:           entity.id,
                name:         entity.name,
                street:       entity.address.street,
                zip_code:     entity.address.zip_code,
                country:      entity.address.country,
                city:         entity.address.city,
                active:       entity.IsActive(),
                rewardPoints: entity.rewardPoints
            });
        }

        async updated(entity:Customer):Promise<void>{
          await customerModel.update(
           {
            name:entity.name
        
          },{
             where:{
                id:entity.id
             }
          });
        }

        async find(id:string):Promise<Customer>{
           const customer =  await customerModel.findOne({where :{ id :id}});
           return new Customer(customer.id,customer.name);
        }

        async find_all():Promise<Customer[]>{
            const allProductModel = await customerModel.findAll();
            return allProductModel.map((element) => new Customer(element.id,element.name));
        }

}
