import { CrudRepository } from "../../repo/crud.repo";
import { NftHabitant } from "./nft-habitant.model";
import { NftHabitantFields } from "./nft-habitant.field";

export class NftHabitantRepository extends CrudRepository<NftHabitant> {

  apiName = "NftHabitant";

  shortFragment = this.parseFragment(`
    ${NftHabitantFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftHabitantFields}
  `);

}

export const NftHabitantService = new NftHabitantRepository();