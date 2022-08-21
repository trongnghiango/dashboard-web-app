import { useState } from "react";
import { classNames } from "../../lib/helpers/design";
import ModalCreateTypeEvent from "./modal-create-type-event";

import NextIcon from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/utilities/form/button";
import useAuth from "../../hooks/use-auth";
import { ROLES } from "../../lib/modules/user/user.model";

const TypeEventActionCreate = ({ loadData }: { loadData: () => void }) => {
  const user = useAuth(ROLES.ADMIN_EDITOR);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      {user?.role === ROLES.ADMIN && (
        <Button
          className={classNames(
            "w-8 h-9 rounded outline-none focus:outline-none",
            "mr-1 mb-1 ease-linear transition-all duration-150"
          )}
          outline
          icon={<NextIcon name="FcPlus" className="text-xl" />}
          onClick={openModal}
        />
      )}
      {open && <ModalCreateTypeEvent open={open} setOpen={setOpen} loadData={loadData} />}
    </>
  );
};

export default TypeEventActionCreate;
