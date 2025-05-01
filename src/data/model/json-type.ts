export type JSONType = 
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray

interface JSONObject {
  [key: string]: JSONType
}

interface JSONArray extends Array<JSONType> {}