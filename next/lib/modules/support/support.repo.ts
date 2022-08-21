import { CrudRepository } from "../../repo/crud.repo";
import { Support } from "./support.model";
import { SupportFields } from "./support.field";
import { CustomerFields } from "../customer/customer.field";

export class SupportRepository extends CrudRepository<Support> {
  apiName = "Support";

  shortFragment = this.parseFragment(`
    ${SupportFields}
    customer{
      ${CustomerFields}
    }
  `);

  fullFragment = this.parseFragment(`
    ${SupportFields}
    customer{
      ${CustomerFields}
    }
  `);
}

export const SupportService = new SupportRepository();
