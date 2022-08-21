import { CrudRepository } from "../../repo/crud.repo";
import { NftAirdrop } from "./nft-airdrop.model";
import { NftAirdropFields } from "./nft-airdrop.field";

export class NftAirdropRepository extends CrudRepository<NftAirdrop> {

  apiName = "NftAirdrop";

  shortFragment = this.parseFragment(`
    ${NftAirdropFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftAirdropFields}
  `);

}

export const NftAirdropService = new NftAirdropRepository();