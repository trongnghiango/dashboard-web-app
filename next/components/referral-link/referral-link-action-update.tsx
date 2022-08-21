import { useState } from "react";
import { ReferralLink } from "../../lib/modules/referral-link/referral-link.model";
import ModalUpdateReferralLink from "./modal-update-referral-link";

import NextIcon from "../../components-shared/next-icon";

type Model = ReferralLink;

const ReferralLinkActionUpdate = ({
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
        <ModalUpdateReferralLink
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default ReferralLinkActionUpdate;
