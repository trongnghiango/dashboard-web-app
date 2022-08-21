import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  TypeEvent,
  TypeEventArgNames,
  TypeEventArgs,
  UpdateTypeEventInput,
} from "../../lib/modules/type-event/type-event.model";
import { TypeEventService } from "../../lib/modules/type-event/type-event.repo";
import { convertObjectNullToEmpty, formatDate } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";
import DateField from "../../components-shared/shared/formik/date-field";

const ModalUpdateTypeEvent = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: TypeEvent;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: TypeEvent, { setSubmitting }: FormikHelpers<TypeEvent>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: TypeEvent) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateTypeEventInput = {
      name: values.name,
      startDate: values.startDate,
      percentFirst: values.percentFirst,
      percentClaim: values.percentClaim,
      periodCliff: values.periodCliff,
      ratioUSD: values.ratioUSD,
    };

    TypeEventService.update({ id, data: params, token })
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

  const getInitialValues = (params: TypeEvent) => {
    const data: TypeEvent = {
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
      title="Update typeEvent"
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
                readOnly
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

export default ModalUpdateTypeEvent;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
