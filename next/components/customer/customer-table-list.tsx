import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  Customer,
  CustomerArgNames,
  CustomerArgs,
} from "../../lib/modules/customer/customer.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import CustomerActionDelete from "./customer-action-delete";
import CustomerActionUpdate from "./customer-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import CustomerActionSetEvent from "./customer-action-set-event";
import { classNames } from "../../lib/helpers/design";

const columnData: ColumnData[] = [
  {
    name: CustomerArgNames.address,
    argument: CustomerArgs.address,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return <div className={classNames("text-10")}>{data?.address}</div>;
    },
  },
  {
    name: CustomerArgNames.referral,
    argument: CustomerArgs.referral,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return <div className={classNames("text-10",data?.referralCustomer?.address === data.address ?"text-danger-dark": "" )}>{data?.referralCustomer?.address}</div>;
    },
  },
  {
    name: CustomerArgNames.introducedPeople,
    argument: CustomerArgs.introducedPeople,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return (
        <div className="text-10">
          {data?.introducedCustomers.map((cus, k) => (
            <div
              key={k}
              className={classNames(
                cus.addressIp === data.addressIp || data.address === cus.address
                  ? "text-danger-dark"
                  : ""
              )}
            >
              <div>{cus.address}</div>
              <div>{cus.addressIp}</div>
              <hr />
            </div>
          ))}
        </div>
      );
    },
  },
  {
    name: CustomerArgNames.addressIp,
    argument: CustomerArgs.addressIp,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CustomerArgNames.balanceATHER,
    argument: CustomerArgs.balanceATHER,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return (
        <div className="flex justify-start items-end bg-blue-600 px-2 rounded-full text-white">
          {data.balanceATHER.toFixed(4)} <span className="text-xs ml-1">ATHER</span>
        </div>
      );
    },
  },
  {
    name: CustomerArgNames.balanceBNB,
    argument: CustomerArgs.balanceBNB,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return (
        <div className="flex justify-start items-end bg-blue-600 px-2 rounded-full text-white">
          {data.balanceBNB.toFixed(4)} <span className="text-xs ml-1">BNB</span>
        </div>
      );
    },
  },
  {
    name: "Type",
    // argument: CustomerArgs.balanceBNB,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: Customer }) => {
      return (
        <div className="flex justify-start items-end bg-green-700 px-2 rounded-full text-white">
          {data.customerType?.name || "Normal"}
        </div>
      );
    },
  },
  {
    name: BaseModelArgNames.createdAt,
    argument: BaseModelArgs.createdAt,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: BaseModelArgNames.updatedAt,
    argument: BaseModelArgs.updatedAt,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE,
    CustomHtml: ({ data, loadData }: { data: Customer; loadData: () => void }) => (
      <>
        <CustomerActionUpdate data={data} loadData={loadData} />
        <CustomerActionDelete data={data} loadData={loadData} />
        <CustomerActionSetEvent data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: Customer; loadData: () => void }) => (
      <>
        <CustomerActionUpdate data={data} loadData={loadData} />
        <CustomerActionDelete data={data} loadData={loadData} />
        <CustomerActionSetEvent data={data} loadData={loadData} />
      </>
    ),
  },
];

const CustomerTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Customer[];
  loadData?: () => void;
}) => {
  return (
    <>
      {viewMode === ViewModes.TABLE && (
        <TableView columnData={columnData} data={data} loadData={loadData} />
      )}
      {viewMode === ViewModes.LIST && (
        <ListView columnData={columnData} data={data} loadData={loadData} />
      )}
    </>
  );
};

export default CustomerTableList;
