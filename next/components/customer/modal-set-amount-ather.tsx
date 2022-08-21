import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  Customer,
  CustomerArgNames,
  CustomerArgs,
  customerStatusData,
  UpdateCustomerInput,
} from "../../lib/modules/customer/customer.model";
import { CustomerService } from "../../lib/modules/customer/customer.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";
import SelectField from "../../components-shared/shared/formik/select-field";
import { TypeEvent } from "../../lib/modules/type-event/type-event.model";
import { CustomerTypeEventService } from "../../lib/modules/customer-type-event/customer-type-event.repo";
// import { CustomerTypeService } from "../../lib/modules/customer-type/customer-type.repo";

const ModalSetAmountAther = ({
  customer,
  event,
  open,
  setOpen,
  loadData,
}: {
  customer?: Customer;
  event?: TypeEvent;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [amount, setAmount] = useState("1000");

  // const loadCustomerTypes = () => {
  //   const token = getUserToken(false);
  //   CustomerTypeService.getAll({ token })
  //     .then((res) => {
  //       const types = res.data.map((val) => ({
  //         value: val.id,
  //         name: val.name,
  //       }));
  //       setCustomerTypes(types);
  //     })
  //     .catch((error: Error) => {
  //       console.log("error", error);
  //       toast.error(error.message);
  //     });
  // };

  const turnOffModal = () => {
    setOpen(null);
  };

  const updateData = (values: Customer) => {
    console.log("---------params", values);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const customerId = customer.id;
    const typeEventId = event.id;
    const amountAther = parseFloat(amount);

    // // console.log("params", params);

    // console.log("amountAther", amountAther);
    // alert(amountAther);

    CustomerTypeEventService.create({
      token,
      data: {
        amountAther,
        customerId,
        typeEventId,
      },
    })
      .then(() => {
        loadData();
        turnOffModal();
        setLoading(false)(dispatch);
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const Actions = () => {
    return (
      <div className="relative flex justify-end p-4 pb-3 pt-2 bg-white z-10 border-t border-gray-3 rounded-b">
        <Button
          submit={false}
          onClick={turnOffModal}
          className="btn-large px-8 mr-2"
          large
          hoverDarken
        >
          Cancel
        </Button>

        <Button onClick={updateData} className="btn-large px-8" primary>
          Save
        </Button>
      </div>
    );
  };

  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Set Ather Amount"
    >
      <div className="p-3">
        <input
          className="border rounded w-full p-2"
          placeholder="Input your ather amount"
          value={amount}
          onChange={onAmountChange}
          type="number"
        />
      </div>
      <Actions />
    </Dialog>
  );
};

export default ModalSetAmountAther;
