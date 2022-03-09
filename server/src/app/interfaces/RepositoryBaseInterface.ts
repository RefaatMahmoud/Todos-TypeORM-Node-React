/**
 * Common interface should be implemented in all repositories has CRUD operations.
 * Note if there a repo not has all CRUD operations then you should create another interface for it
   to not violate Interface Segregation Principle 
 */
export default interface RepositoryBaseInterface {
  getAll(): Promise<{}>;
  find(id: Number): Promise<{}>;
  store(data: {}): Promise<{}>;
  update(id: Number, data: {}): Promise<{}>;
  delete(id: Number): Promise<{}>;
}
