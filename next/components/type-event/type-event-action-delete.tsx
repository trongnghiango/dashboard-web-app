import { useState } from "react";
import { TypeEvent } from "../../lib/modules/type-event/type-event.model";
import ModalDeleteTypeEvent from "./modal-delete-type-event";

import NextIcon from "../../components-shared/next-icon";

type Model = TypeEvent;

const TypeEventActionDelete = ({
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
        <NextIcon  name='FcEmptyTrash' className="" /> Delete
      </button>
      {open && (
        <ModalDeleteTypeEvent
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default TypeEventActionDelete;
