import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  Support,
  SupportArgNames,
  SupportArgs,
  supportStatusData,
  SupportTypes,
} from "../../lib/modules/support/support.model";
import { SupportService } from "../../lib/modules/support/support.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";
import SelectField from "../../components-shared/shared/formik/select-field";

const ModalUpdateSupport = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Support;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: Support, { setSubmitting }: FormikHelpers<Support>) => {
    // console.log("values", values);
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Support) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: any = {
      reason: values.reason,
      status: values.status,
    };

    SupportService.update({ id, data: params, token })
      .then(() => {
        loadData();
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const getInitialValues = (params: Support) => {
    const data: Support = {
      ...convertObjectNullToEmpty(params),
    };
    return data;
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

        <Button submit={true} className="btn-large px-8" primary asyncLoading>
          Save
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Update support"
    >
      <Formik
        initialValues={getInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={SupportArgNames.transactionHash}
                inputName={SupportArgs.transactionHash}
                placeholder={`Input ${SupportArgNames.reason}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={SupportArgNames.blockNumber}
                inputName={SupportArgs.blockNumber}
                placeholder={`Input ${SupportArgNames.reason}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={SupportArgNames.content}
                inputName={SupportArgs.content}
                placeholder={`Input ${SupportArgNames.reason}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              {values.type !== SupportTypes.AIRDROP && values.type !== SupportTypes.LIST_NFT ? (
                <InputField
                  labelName={SupportArgNames.amountAther}
                  inputName={SupportArgs.amountAther}
                  inputType={InputType.number}
                  placeholder={`Input ${SupportArgNames.amountAther}`}
                  readOnly
                  // haveErrors={errors.amountAther && touched.amountAther}
                  // error={errors.amountAther}
                />
              ) : (
                <InputField
                  labelName={SupportArgNames.nftId}
                  inputName={SupportArgs.nftId}
                  placeholder={`Input ${SupportArgNames.nftId}`}
                  readOnly
                  // haveErrors={errors.amountAther && touched.amountAther}
                  // error={errors.amountAther}
                />
              )}
              <InputField
                labelName={SupportArgNames.type}
                inputName={SupportArgs.type}
                placeholder={`Input ${SupportArgNames.type}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={SupportArgNames.reason}
                inputName={SupportArgs.reason}
                placeholder={`Input ${SupportArgNames.reason}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <SelectField
                labelName={SupportArgNames.status}
                inputName={SupportArgs.status}
                selectData={supportStatusData}
                // haveErrors={errors.status && touched.status}
                // error={errors.status}
              />
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateSupport;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
