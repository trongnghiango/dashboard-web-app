import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  ReferralTransaction,
  ReferralTransactionArgNames,
  ReferralTransactionArgs,
} from "../../lib/modules/referral-transaction/referral-transaction.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import ReferralTransactionActionDelete from "./referral-transaction-action-delete";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: ReferralTransactionArgNames.amountAther,
    argument: ReferralTransactionArgs.amountAther,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ReferralTransactionArgNames.status,
    argument: ReferralTransactionArgs.status,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ReferralTransactionArgNames.transactionId,
    argument: ReferralTransactionArgs.transactionId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ReferralTransactionArgNames.customer,
    argument: ReferralTransactionArgs.customer,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: ReferralTransaction }) => <>{data.customer.address}</>,
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
    CustomHtml: ({ data, loadData }: { data: ReferralTransaction; loadData: () => void }) => (
      <>
        <ReferralTransactionActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: ReferralTransaction; loadData: () => void }) => (
      <>
        <ReferralTransactionActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const ReferralTransactionTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: ReferralTransaction[];
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

export default ReferralTransactionTableList;
