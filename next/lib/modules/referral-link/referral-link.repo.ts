import { CrudRepository } from "../../repo/crud.repo";
import { ReferralLink } from "./referral-link.model";
import { ReferralLinkFields } from "./referral-link.field";

export class ReferralLinkRepository extends CrudRepository<ReferralLink> {

  apiName = "ReferralLink";

  shortFragment = this.parseFragment(`
    ${ReferralLinkFields}
  `);

  fullFragment = this.parseFragment(`
    ${ReferralLinkFields}
  `);

}

export const ReferralLinkService = new ReferralLinkRepository();