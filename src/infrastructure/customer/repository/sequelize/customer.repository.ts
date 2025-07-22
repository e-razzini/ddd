import customerModel               from "./customer.model";
import Customer                    from "../../../../domain/customer/entity/customer";
import Address                     from "../../../../domain/customer/value-object/address";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";

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
            const allCustomerModel = await customerModel.findAll();
            
             return allCustomerModel.map((element) =>{ 
                const customer =  new Customer(element.id,element.name);
                const address =   new Address(element.street,element.zip_code,element.city,element.country);
                customer.setAddress(address);
                return customer;
            });

             


        }

}
