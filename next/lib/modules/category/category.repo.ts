import { CrudRepository } from "../../repo/crud.repo";
import { Category } from "./category.model";
import { CategoryFields } from "./category.field";

export class CategoryRepository extends CrudRepository<Category> {

  apiName = "Category";

  shortFragment = this.parseFragment(`
    ${CategoryFields}
  `);

  fullFragment = this.parseFragment(`
    ${CategoryFields}
  `);

}

export const CategoryService = new CategoryRepository();