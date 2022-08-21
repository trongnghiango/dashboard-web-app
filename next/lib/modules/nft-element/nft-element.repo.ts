import { CrudRepository } from "../../repo/crud.repo";
import { NftElement } from "./nft-element.model";
import { NftElementFields } from "./nft-element.field";

export class NftElementRepository extends CrudRepository<NftElement> {

  apiName = "NftElement";

  shortFragment = this.parseFragment(`
    ${NftElementFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftElementFields}
  `);

}

export const NftElementService = new NftElementRepository();