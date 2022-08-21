import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { Customer } from "../../lib/modules/customer/customer.model";
import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import { TypeEventService } from "../../lib/modules/type-event/type-event.repo";
import { TypeEvent, TypeEventArgNames } from "../../lib/modules/type-event/type-event.model";
import moment from "moment-timezone";
import { classNames } from "../../lib/helpers/design";
import ModalSetAmountAther from "./modal-set-amount-ather";
import { isNull } from "lodash";
import { CustomerTypeEventService } from "../../lib/modules/customer-type-event/customer-type-event.repo";
import { CustomerTypeEvent } from "../../lib/modules/customer-type-event/customer-type-event.model";
import { Button } from "../../components-shared/shared/utilities/form/button";
// import { CustomerTypeService } from "../../lib/modules/customer-type/customer-type.repo";

const ModalSetEvent = ({
  data,
  open,
  setOpen,
}: {
  data: Customer;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [events, setEvents] = useState<TypeEvent[]>();
  const [customerTypeEvents, setCustomerTypeEvents] = useState<CustomerTypeEvent[]>();

  useEffect(() => {
    loadTypeEvent();
  }, []);

  useEffect(() => {
    if (events) {
      loadCustomerTypeEvent();
    }
  }, [events]);

  const loadTypeEvent = () => {
    const token = getUserToken(false);
    TypeEventService.getAll({
      token,
      query: {
        limit: 9999,
      },
    })
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };

  const loadCustomerTypeEvent = () => {
    const token = getUserToken(false);
    CustomerTypeEventService.getAll({
      token,
      query: {
        limit: 9999,
        filter: {
          customerId: data.id,
        },
      },
    })
      .then((res) => {
        setCustomerTypeEvents(res.data);
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };

  // console.log("customerTypeEvents", customerTypeEvents);

  const turnOffModal = () => {
    setOpen(!open);
  };

  const [selectedEvent, setEvent] = useState();
  const selectEvent = (event) => {
    setEvent(event);
  };

  const deselectEvent = (event: CustomerTypeEvent) => {
    const token = getUserToken(false);
    CustomerTypeEventService.delete({
      token,
      id: event.id,
    })
      .then((res) => {
        loadCustomerTypeEvent();
        toast.success("Deselected successfully!");
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Dialog
        width="700px"
        dialogClass="relative bg-white shadow-md rounded m-auto"
        isOpen={open}
        onClose={turnOffModal}
        mobileMode={false}
        title="Set Event"
      >
        <div className="p-5">
          {events ? (
            <div className="grid grid-cols-3 gap-5">
              {events
                .filter((e) => e.startDate)
                .map((event, k) => {
                  const selected = customerTypeEvents?.find((cte) => cte.typeEventId === event.id);
                  return (
                    <div
                      key={k}
                      className={classNames(
                        "text-left",
                        "grid grid-cols-2 gap-1",
                        "p-2 rounded-lg shadow",
                        selected ? "bg-primary-dark text-white" : "bg-white "
                      )}
                    >
                      <div>{TypeEventArgNames.name}</div> <div>{event.name}</div>
                      <div>{TypeEventArgNames.percentClaim}</div> <div>{event.percentClaim}</div>
                      <div>{TypeEventArgNames.percentFirst}</div> <div>{event.percentFirst}</div>
                      <div>{TypeEventArgNames.periodCliff}</div> <div>{event.periodCliff}</div>
                      <div>{TypeEventArgNames.ratioUSD}</div> <div>{event.ratioUSD}</div>
                      <div>{TypeEventArgNames.startDate}</div>{" "}
                      <div>
                        {event.startDate ? moment(event.startDate).format("DD/MM/yyyy") : ""}
                      </div>
                      {selected && (
                        <>
                          <div className="col-span-2 border-b border-white"></div>
                          <div>Ather</div> <div>{selected?.amountAther}</div>
                        </>
                      )}
                      <Button
                        success
                        onClick={() => selectEvent(event)}
                        disabled={selected ? true : false}
                      >
                        Select
                      </Button>
                      <Button
                        danger
                        onClick={() => deselectEvent(selected)}
                        disabled={selected ? false : true}
                      >
                        Deselect
                      </Button>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>Không có dữ liệu</>
          )}
        </div>
      </Dialog>
      {selectedEvent && (
        <ModalSetAmountAther
          customer={data}
          event={selectedEvent}
          open={!isNull(selectedEvent)}
          setOpen={setEvent}
          loadData={loadCustomerTypeEvent}
        />
      )}
    </>
  );
};

export default ModalSetEvent;
