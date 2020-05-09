/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"



/**
* OrderBy
 *
 * column ordering options
*/
export const OrderByEnum = types.enumeration("OrderBy", [
        "asc", // in the ascending order, nulls last
  "asc_nulls_first", // in the ascending order, nulls first
  "asc_nulls_last", // in the ascending order, nulls last
  "desc", // in the descending order, nulls first
  "desc_nulls_first", // in the descending order, nulls first
  "desc_nulls_last", // in the descending order, nulls last
      ])
