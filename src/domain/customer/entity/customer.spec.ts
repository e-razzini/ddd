import Address  from "../value-object/address";
import Customer from "./customer";
describe("customer tests",function(){

   test("create customer valid id", () =>{
        
      
      expect(() => {
         
         //let customer = new Customer("1243725728347","Elton Patrik Razzini dos Santos");
         let customer = new Customer("","Elton Patrik Razzini dos Santos");
         
      }).toThrowError("Id e obrigatorio.");// esse retorno de erro deve ser igual ao da classe de validacao de dados
        
   });

   test("create customer valid name",()=>{

      expect(()=>{
         //let customer = new Customer("1243725728347","Elton Patrik Razzini dos Santos");
         let customer = new Customer("1243725728347","");

      }).toThrowError("Nome e Obrigatorio.");
   });

   test("create customer change name",()=>{

      let customer = new Customer("1243725728347","Elton Patrik Razzini dos Santos");
      customer.changeName("Elton Razzini");
      expect(customer.name).toBe("Elton Razzini");

   });

   test("create customer change activate",()=>{

      let customer  = new Customer("1243725728347","Elton Patrik Razzini dos Santos");
      const address = new Address("Rua Antonio Fagundes","1010","Blumenau","Brasil");
      customer.setAddress(address);
      customer.activate();
      expect(customer.IsActive()).toBe(true);

   });

   test("create customer address change activate",()=>{

      expect(() =>{
         let customer  = new Customer("1243725728347","Elton Patrik Razzini dos Santos");
         customer.activate();
      }).toThrowError("Endereço e obrigatorio.");

   });

   test("create customer change deactivate",()=>{

      let customer  = new Customer("1243725728347","Elton Patrik Razzini dos Santos");
      customer.deactivate();
      expect(customer.IsActive()).toBe(false);

   });   

   test("Points tester",() =>{

      const customer = new Customer("1","customer 001");
      expect(customer.rewardPoints).toBe(0)

      customer.AddRewardPoints(10)
      expect(customer.rewardPoints).toBe(10)

      customer.AddRewardPoints(30)
      expect(customer.rewardPoints).toBe(40)
   })

});
