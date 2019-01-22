import request from "@/utils/request";

export function getCategorys() {
  return request({
    url: "/metas/categorys",
    method: "get"
  });
}

export function getCategory(params: IQueryMeta) {
  return request({
    url: `/metas/category`,
    method: "get",
    params
  });
}

export function updateCategory(data: ISaveMeta) {
  return request({
    url: `/metas/category/${data.id}`,
    method: "put",
    data
  });
}

export function deleteCategory(id: number) {
  return request({
    url: `/metas/category/${id}`,
    method: "delete"
  });
}

export function addCategory(data: ISaveMeta) {
  return request({
    url: `/metas/category`,
    method: "post",
    data
  });
}
