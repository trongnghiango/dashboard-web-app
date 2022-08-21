import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  NftType,
  NftTypeArgNames,
  NftTypeArgs,
  UpdateNftTypeInput,
} from "../../lib/modules/nft-type/nft-type.model";
import { NftTypeService } from "../../lib/modules/nft-type/nft-type.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";

const ModalUpdateNftType = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: NftType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: NftType, { setSubmitting }: FormikHelpers<NftType>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: NftType) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateNftTypeInput = {
      name: values.name,
      color: values.color,
      description: values.description,
      image: values.image,
    };

    NftTypeService.update({ id, data: params, token })
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

  const getInitialValues = (params: NftType) => {
    const data: NftType = {
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
      title="Update nftType"
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
                labelName={NftTypeArgNames.name}
                inputName={NftTypeArgs.name}
                placeholder={`Input ${NftTypeArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <TextAreaField
                labelName={NftTypeArgNames.description}
                inputName={NftTypeArgs.description}
                placeholder={`Input ${NftTypeArgNames.description}`}
                value={values.description}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftTypeArgNames.image}
                inputName={NftTypeArgs.image}
                placeholder={`Input ${NftTypeArgNames.image}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftTypeArgNames.color}
                inputName={NftTypeArgs.color}
                placeholder={`Input ${NftTypeArgNames.color}`}
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

export default ModalUpdateNftType;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
