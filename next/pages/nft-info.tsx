import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/admin-layout/admin.layout";
import { Pagination } from "../lib/models/base-model.model";
import { useToast } from "../providers/toast-provider";
import { setLoading } from "../redux/actions/loading.action";
import { useDispatch } from "../redux/store";
import PageHeader from "../components-shared/page-header";
import Paging from "../components-shared/paging";
import { getUserToken, ROLES } from "../lib/modules/user/user.model";
import TableListWrapper from "../components-shared/table-list-wrapper";
import PageHeaderSearch from "../components-shared/page-header-search";
import PageHeaderFunctions from "../components-shared/page-header-functions";
import TableFunction from "../components-shared/table-function";
import usePageConfigs from "../hooks/use-page-configs";
import useAuth from "../hooks/use-auth";

import { NftInfo } from "../lib/modules/nft-info/nft-info.model";
import { NftInfoService } from "../lib/modules/nft-info/nft-info.repo";
import NftInfoTableList from "../components/nft-info/nft-info-table-list";
import NftInfoActionCreate from "../components/nft-info/nft-info-action-create";

const NftInfoPage = (props: any) => {
  useAuth(ROLES.ADMIN_EDITOR);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<NftInfo[]>();
  const [search, setSearch] = useState<string>("");
  const [length, setLength] = useState<number>(10);
  const [pagination, setPagination] = useState<Pagination>();
  const [viewMode, setViewMode]: any = usePageConfigs();

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    getData({ page, length });
  }, []);

  const getData = async ({ page, length }: { page: number; length: number }) => {
    const offset = page - 1;
    const handleResult = ({ data, pagination }: any) => {
      setData(data);
      setPagination(pagination);
      setLoading(false)(dispatch);
    };

    const handleError = (error: any) => {
      console.log("error", error);
      toast.error("System error! Please visit later. Thank you.");
      setLoading(false)(dispatch);
    };

    setLoading(true)(dispatch);
    // const filterParams = {};

    // if (startDate && endDate) {
    //   set(filterParams, "resultAt", {
    //     __gte: startDate,
    //     __lt: endDate,
    //   });
    // }

    const token = getUserToken(false);

    NftInfoService.getAll({
      query: {
        limit: length,
        offset: offset * length,
        search,
        filter: {},
        order: {
          _id: -1,
        },
      },
      token,
      cache: false,
      fragment: NftInfoService.fullFragment,
    })
      .then(handleResult)
      .catch(handleError);
  };

  const loadData = () => {
    getData({ page, length });
  };

  const onPageChange = (page: number) => {
    setPage(page);
    getData({ page, length });
  };

  const onLengthChange = (length: number) => {
    getData({ page, length });
    setLength(length);
  };

  return (
    <section className="w-full mb-16 p-4">
      <div className="relative shadow-lg">
        <Head {...{ loadData, search, setSearch, setViewMode }} />
        <Table
          {...{
            viewMode,
            data,
            loadData,
            pagination,
            page,
            length,
            onPageChange,
            onLengthChange,
          }}
        />
      </div>
    </section>
  );
};

NftInfoPage.Layout = AdminLayout;
export default NftInfoPage;

const Head = React.memo(({ loadData, search, setSearch, setViewMode }: any) => {
  const dispatch = useDispatch();
  const importNfts = () => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    NftInfoService.importNfts({ token })
      .then((data) => {
        // console.log("data", data);
        setLoading(false)(dispatch);
        loadData();
      })
      .catch((error) => {
        setLoading(false)(dispatch);
        console.log("error", error);
      });
  };
  const tableFunctions = [
    {
      icon: "FcImport",
      action: importNfts,
      className: "bg-white text-black",
    },
    {
      icon: "FcRefresh",
      action: () => {},
      className: "bg-white text-black",
    },
  ];
  return (
    <>
      <PageHeader>
        <PageHeaderSearch {...{ loadData, search, setSearch }} />
        <PageHeaderFunctions setViewMode={setViewMode}>
          <TableFunction tableFunctions={tableFunctions} />
          <NftInfoActionCreate loadData={loadData} />
        </PageHeaderFunctions>
      </PageHeader>
      <div className="bg-primary-dark text-white text-center">
        <a
          href="https://docs.google.com/spreadsheets/d/1tCetgOujq5y3HTuUSMxKw0MiQvGQbr0vNLZQlJF0Okk/edit#gid=1814250867"
          // target="_blank"
        >
         Click here to get Template Import
        </a>
      </div>
    </>
  );
});

Head.displayName = "Head";

const Table = ({
  viewMode,
  data,
  loadData,
  pagination,
  page,
  length,
  onPageChange,
  onLengthChange,
}: any) => {
  return (
    <div className="bg-seconds-light pb-1">
      <TableListWrapper>
        <NftInfoTableList data={data} loadData={loadData} viewMode={viewMode} />
      </TableListWrapper>
      <Paging
        onLengthChange={onLengthChange}
        onPageChange={onPageChange}
        pagination={pagination}
        page={page}
        length={length}
      />
    </div>
  );
};
