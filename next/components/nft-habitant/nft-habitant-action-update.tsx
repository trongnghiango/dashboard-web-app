import { useState } from "react";
import { NftHabitant } from "../../lib/modules/nft-habitant/nft-habitant.model";
import ModalUpdateNftHabitant from "./modal-update-nft-habitant";

import NextIcon from "../../components-shared/next-icon";

type Model = NftHabitant;

const NftHabitantActionUpdate = ({
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
        <ModalUpdateNftHabitant
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftHabitantActionUpdate;
