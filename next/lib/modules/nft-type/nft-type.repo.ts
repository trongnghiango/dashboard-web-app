import { CrudRepository } from "../../repo/crud.repo";
import { NftType } from "./nft-type.model";
import { NftTypeFields } from "./nft-type.field";

export class NftTypeRepository extends CrudRepository<NftType> {

  apiName = "NftType";

  shortFragment = this.parseFragment(`
    ${NftTypeFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftTypeFields}
  `);

}

export const NftTypeService = new NftTypeRepository();