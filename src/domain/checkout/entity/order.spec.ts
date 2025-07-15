import Order     from "./order";
import OrderItem from "./order_item";

describe("Testes de Ordem",() => {


    test("Order id e null",() => {
    
        expect(() =>{
            let order = new Order("","589794546",[])
        }).toThrowError("Id de ordem é obrigatorio");
    });

    test("Customer id e null",() => {
    
        expect(() =>{
            let order = new Order("589794546","",[])
        }).toThrowError("Id de customer é obrigatorio");
    });

    test("Items e obrigatorio",() => {
    
        expect(() =>{
            let order   = new Order("589794546","79744545",[]);
        }).toThrowError("Items é obrigatorio");
    });

    test("Total items value",() =>{

        let order_item_01 = new OrderItem("item 0001","Produto 0001",50,"p1",1);
        let order_item_02 = new OrderItem("item 0002","Produto 0002",200,"p2",2);
        let order         = new Order("589794546","79744545",[order_item_01,order_item_02]);
        let total         = order.total_price();

        expect(total).toBe(250);
    });

    test("Total items value",() =>{

        expect(() =>{
         let order_item_01 = new OrderItem("item 0001","Produto 0001",50,"p1",0);
         let order         = new Order("589794546","79744545",[order_item_01]);
        }).toThrowError("Quantidade de item e Zero");
    });

})