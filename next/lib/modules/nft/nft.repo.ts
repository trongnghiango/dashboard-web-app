import { CrudRepository } from "../../repo/crud.repo";
import { Nft } from "./nft.model";
import { NftFields } from "./nft.field";
import { NftInfoFields } from "../nft-info/nft-info.field";
import { NftInfoService } from "../nft-info/nft-info.repo";
import { MutationOptions } from "@apollo/client";

export class NftRepository extends CrudRepository<Nft> {
  apiName = "Nft";

  shortFragment = this.parseFragment(`
    ${NftFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftFields}
    nftInfo {
      ${NftInfoService.fullFragment}
    }
  `);

  async rejectDropNft({ token }: { token: string }) {
    const api = "rejectDropNft";

    const options = {
      mutation: this.gql`${this.generateGQL("mutation", `${this.mutationData({ api })}`)}`,
      fetchPolicy: "no-cache",
    } as MutationOptions;

    if (token) options.context = { headers: { "x-token": token } };

    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data["g0"] as Nft;
  }
}

export const NftService = new NftRepository();
