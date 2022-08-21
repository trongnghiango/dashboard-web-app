import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  Provider,
  ProviderArgNames,
  ProviderArgs,
  ProviderCodeData,
  SmartContractData,
  UpdateProviderInput,
} from "../../lib/modules/provider/provider.model";
import { ProviderService } from "../../lib/modules/provider/provider.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";
import CheckboxField from "../../components-shared/shared/formik/checkbox-field";
import SelectField from "../../components-shared/shared/formik/select-field";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";

const ModalUpdateProvider = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Provider;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: Provider, { setSubmitting }: FormikHelpers<Provider>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Provider) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateProviderInput = {
      name: values.name,
      appId: values.appId,
      code: values.code,
      contract: values.contract,
      serverUrl: values.serverUrl,
    };

    ProviderService.update({ id, data: params, token })
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

  const getInitialValues = (params: Provider) => {
    const data: Provider = {
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
      title="Update provider"
    >
      <Formik
        initialValues={getInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <SelectField
                labelName={ProviderArgNames.code}
                inputName={ProviderArgs.code}
                selectData={ProviderCodeData}
                // haveErrors={errors.status && touched.status}
                // error={errors.status}
              />
              <InputField
                labelName={ProviderArgNames.name}
                inputName={ProviderArgs.name}
                placeholder={`Input ${ProviderArgNames.name}`}
                haveErrors={errors.name && touched.name}
                error={errors.name}
              />
              <SelectField
                labelName={ProviderArgNames.contract}
                inputName={ProviderArgs.contract}
                selectData={SmartContractData}
                // haveErrors={errors.status && touched.status}
                // error={errors.status}
              />
              <TextAreaField
                labelName={ProviderArgNames.serverUrl}
                inputName={ProviderArgs.serverUrl}
                value={values.serverUrl}
                placeholder={`Input ${ProviderArgNames.serverUrl}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={ProviderArgNames.appId}
                inputName={ProviderArgs.appId}
                placeholder={`Input ${ProviderArgNames.appId}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateProvider;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
