import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, { InputType } from // InputType,
"../../components-shared/shared/formik/input-field";
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import {
  TypeEventArgNames,
  TypeEventArgs,
  TypeEventInitialValues,
  CreateTypeEventInput,
} from "../../lib/modules/type-event/type-event.model";
import { TypeEventService } from "../../lib/modules/type-event/type-event.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import DateField from "../../components-shared/shared/formik/date-field";
import { formatDate } from "../../lib/helpers/common.helper";

const ModalCreateTypeEvent = ({
  open,
  setOpen,
  loadData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (
    values: CreateTypeEventInput,
    { setSubmitting }: FormikHelpers<CreateTypeEventInput>
  ) => {
    createData({ ...values });
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: CreateTypeEventInput) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    TypeEventService.create({ data, token })
      .then(() => {
        loadData();
        toast.success("Create data successfully.");
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
      title="Create new typeEvent"
    >
      <Formik
        initialValues={TypeEventInitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={TypeEventArgNames.name}
                inputName={TypeEventArgs.name}
                placeholder={`Input ${TypeEventArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={TypeEventArgNames.code}
                inputName={TypeEventArgs.code}
                placeholder={`Input ${TypeEventArgNames.code}`}
              />
              <InputField
                labelName={TypeEventArgNames.percentClaim}
                inputName={TypeEventArgs.percentClaim}
                placeholder={`Input ${TypeEventArgNames.percentClaim}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={TypeEventArgNames.percentFirst}
                inputName={TypeEventArgs.percentFirst}
                placeholder={`Input ${TypeEventArgNames.percentFirst}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={TypeEventArgNames.periodCliff}
                inputName={TypeEventArgs.periodCliff}
                placeholder={`Input ${TypeEventArgNames.periodCliff}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={TypeEventArgNames.ratioUSD}
                inputName={TypeEventArgs.ratioUSD}
                placeholder={`Input ${TypeEventArgNames.ratioUSD}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <DateField
                labelName={TypeEventArgNames.startDate}
                inputName={TypeEventArgs.startDate}
                value={values[TypeEventArgs.startDate]}
                placeholder={`Input ${TypeEventArgNames.startDate}`}
                setFieldValue={setFieldValue}
                format={formatDate}
                // haveErrors={errors.date && touched.date}
                // error={errors.date}
              />
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalCreateTypeEvent;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
