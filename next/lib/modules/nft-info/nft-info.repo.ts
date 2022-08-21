import { CrudRepository } from "../../repo/crud.repo";
import { NftInfo } from "./nft-info.model";
import { NftInfoFields } from "./nft-info.field";
import { NftCategoryService } from "../nft-category/nft-category.repo";
import { NftElementService } from "../nft-element/nft-element.repo";
import { NftHabitantService } from "../nft-habitant/nft-habitant.repo";
import { NftRarityService } from "../nft-rarity/nft-rarity.repo";
import { NftTypeService } from "../nft-type/nft-type.repo";
import { MutationOptions } from "@apollo/client";

export class NftInfoRepository extends CrudRepository<NftInfo> {
  apiName = "NftInfo";

  shortFragment = this.parseFragment(`
    ${NftInfoFields}
  `);

  fullFragment = this.parseFragment(`
    ${NftInfoFields}
    nftCategory {
      ${NftCategoryService.fullFragment}
    }
    nftElement {
      ${NftElementService.fullFragment}
    }
    nftHabitant {
      ${NftHabitantService.fullFragment}
    }
    nftRarity {
      ${NftRarityService.fullFragment}
    }
    nftType {
      ${NftTypeService.fullFragment}
    }
  `);

  async importNfts({ token }: { token: string }) {
    const api = "importNfts";
    const option: MutationOptions = {
      mutation: this.gql`
      mutation {
        ${api} {
          success
        }
      }
    `,
    };

    option.context = { headers: { "x-token": token } };
    const result = await this.apollo.mutate(option);
    this.handleError(result);
    return result.data[api] as any;
  }
}

export const NftInfoService = new NftInfoRepository();
