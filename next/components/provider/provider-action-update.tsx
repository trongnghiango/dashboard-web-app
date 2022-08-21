import { useState } from "react";
import { Provider } from "../../lib/modules/provider/provider.model";
import ModalUpdateProvider from "./modal-update-provider";

import NextIcon from "../../components-shared/next-icon";

type Model = Provider;

const ProviderActionUpdate = ({
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
        <ModalUpdateProvider
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default ProviderActionUpdate;
