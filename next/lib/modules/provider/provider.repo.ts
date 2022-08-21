import { CrudRepository } from "../../repo/crud.repo";
import { Provider } from "./provider.model";
import { ProviderFields } from "./provider.field";

export class ProviderRepository extends CrudRepository<Provider> {

  apiName = "Provider";

  shortFragment = this.parseFragment(`
    ${ProviderFields}
  `);

  fullFragment = this.parseFragment(`
    ${ProviderFields}
  `);

}

export const ProviderService = new ProviderRepository();