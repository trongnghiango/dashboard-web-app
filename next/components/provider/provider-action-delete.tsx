import { useState } from "react";
import { Provider } from "../../lib/modules/provider/provider.model";
import ModalDeleteProvider from "./modal-delete-provider";

import NextIcon from "../../components-shared/next-icon";

type Model = Provider;

const ProviderActionDelete = ({
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
        <ModalDeleteProvider
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default ProviderActionDelete;
