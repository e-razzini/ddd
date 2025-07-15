import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface orderRepositoryInterface 
extends RepositoryInterface<Order>{}