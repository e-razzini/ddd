export default interface RepositoryInterface<T> {
    create(entity:T):Promise<void>;
    updated(entity:T):Promise<void>;

    find(id:string):Promise<T>;
    find_all():Promise<T[]>;
}