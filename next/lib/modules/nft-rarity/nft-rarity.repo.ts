import { CrudRepository } from "../../repo/crud.repo";
import { NftRarity } from "./nft-rarity.model";
import { NftRarityFields } from "./nft-rarity.field";

export class NftRarityRepository extends CrudRepository<NftRarity> {

  apiName = "NftRarity";

  shortFragment = this.parseFragment(`
    ${NftRarityFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftRarityFields}
  `);

}

export const NftRarityService = new NftRarityRepository();