import { useState } from "react";
import { Customer } from "../../lib/modules/customer/customer.model";

import NextIcon from "../../components-shared/next-icon";
import ModalSetEvent from "./modal-set-event";

type Model = Customer;

const CustomerActionSetEvent = ({
  data,
  loadData,
}: {
  data: Model;
  loadData: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        className="text-primary-dark hover:underline py-1 px-3 border-0 bg-none flex gap-1  items-center"
        onClick={openModal}
      >
        <NextIcon  name='FcEditImage' className="" /> Set Event
      </button>
      {open && (
        <ModalSetEvent
          data={data}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default CustomerActionSetEvent;
