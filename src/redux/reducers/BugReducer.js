import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const createRequest = (url) => ({ url })

export const bugApi = createApi({
    reducerPath: 'bugApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_URL_API}),
    endpoints: (builder) => ({
        getBugs: builder.query({
            query: () => createRequest('/api/admin/bugs')
        })
    })
})

export const {
    useGetBugsQuery
} = bugApi

/*

import { createApi } from '@reduxjs/toolkit/query'
import axios from 'axios'

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }

const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://example.com',
  }),
  endpoints(build) {
    return {
      query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
      mutation: build.mutation({
        query: () => ({ url: '/mutation', method: 'post' }),
      }),
    }
  },
})

*/