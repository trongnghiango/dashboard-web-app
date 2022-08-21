import { CrudRepository } from "../../repo/crud.repo";
import { CustomerTypeEvent } from "./customer-type-event.model";
import { CustomerTypeEventFields } from "./customer-type-event.field";

export class CustomerTypeEventRepository extends CrudRepository<CustomerTypeEvent> {
  apiName = "CustomerTypeEvent";

  shortFragment = this.parseFragment(`
    ${CustomerTypeEventFields}
  `);

  fullFragment = this.parseFragment(`
    ${CustomerTypeEventFields}
  `);
}

export const CustomerTypeEventService = new CustomerTypeEventRepository();
