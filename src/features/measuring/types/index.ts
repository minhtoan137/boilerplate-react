export type MeasuringResponse = {
  success: boolean,
  data?: any,
  pagination?: any
  error?: boolean,
  message?: string
};

export type MeasuringInput = {
  key: string,
  name: string,
  unit?: string
  numericalOrder: number
}