import { useState } from "react";
import { Support } from "../../lib/modules/support/support.model";
import ModalUpdateSupport from "./modal-update-support";

import NextIcon from "../../components-shared/next-icon";

type Model = Support;

const SupportActionUpdate = ({
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
        <NextIcon  name='FcEditImage' className="" /> Update
      </button>
      {open && (
        <ModalUpdateSupport
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default SupportActionUpdate;
