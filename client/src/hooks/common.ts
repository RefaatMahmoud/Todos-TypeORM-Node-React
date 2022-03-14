import { useCallback, useEffect, useState } from "react";
import modelTypeEnum from "../enms/modelTypesEnum";
import BaseService from "../services/BaseService";

export const useGetListData = (modelType: modelTypeEnum, dataKey: string) => {
  const [data, _setData] = useState([]);

  const getData = useCallback(async () => {
    const res: any = await new BaseService(modelType).getList();
    const { data } = res;
    _setData(data[dataKey]);
  }, [modelType, dataKey]);

  useEffect(() => {
    getData();
  }, [getData]);
  return { data };
};
