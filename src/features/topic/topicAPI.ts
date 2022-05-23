import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosBaseQuery } from "../../app/AxiosBaseQuery";
import { API_ENDPOINT } from "../../common/constants";
import { IResponseData, IResponseDataArray } from "../../common/interface";
import { transformTopicResponse } from "../../common/transformer";
import { ICreateTopic, ITopic, ITopicResponse } from "./interface";
import _ from "lodash";

export const api = createApi({
  baseQuery: AxiosBaseQuery({
    baseUrl: API_ENDPOINT,
  }),
  reducerPath: "topicAPI",
  endpoints(build) {
    return {
      getTopics: build.query<ITopic[], void>({
        query: () => ({ url: "/v1/messages", method: "get" }),
        transformResponse: (response: IResponseDataArray<ITopicResponse>) => {
          const items = transformTopicResponse(response.data) as ITopic[];
          return _.orderBy(items, item => new Date(item.createdAt));
        },
      }),
      createTopic: build.mutation<ITopic, ICreateTopic>({
        query: (payload) => ({ url: "/v1/messages", method: "post", data: payload }),
        transformResponse: (response: IResponseData<ITopicResponse>) => {
          return transformTopicResponse(response.data) as ITopic;
        }
      })
    }
  },
})

export const useGetTopics = api.endpoints.getTopics.useQuery;
export const useCreateTopic = api.endpoints.createTopic.useMutation;