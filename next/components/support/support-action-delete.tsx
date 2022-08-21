import { useState } from "react";
import { Support } from "../../lib/modules/support/support.model";
import ModalDeleteSupport from "./modal-delete-support";

import NextIcon from "../../components-shared/next-icon";

type Model = Support;

const SupportActionDelete = ({
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
        <ModalDeleteSupport
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SupportActionDelete;
