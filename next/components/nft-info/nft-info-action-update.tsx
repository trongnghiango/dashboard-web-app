import { useState } from "react";
import { NftInfo } from "../../lib/modules/nft-info/nft-info.model";
import ModalUpdateNftInfo from "./modal-update-nft-info";

import NextIcon from "../../components-shared/next-icon";

type Model = NftInfo;

const NftInfoActionUpdate = ({
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
        <ModalUpdateNftInfo
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftInfoActionUpdate;
