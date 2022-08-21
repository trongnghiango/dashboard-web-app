import { CrudRepository } from "../../repo/crud.repo";
import { NftCategory } from "./nft-category.model";
import { NftCategoryFields } from "./nft-category.field";

export class NftCategoryRepository extends CrudRepository<NftCategory> {

  apiName = "NftCategory";

  shortFragment = this.parseFragment(`
    ${NftCategoryFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftCategoryFields}
  `);

}

export const NftCategoryService = new NftCategoryRepository();