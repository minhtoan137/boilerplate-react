export type MeasuringType = {
  success: boolean,
  data: any,
  pagination: any
  error?: boolean,
  message?: string
};

export type CreateMeasuringInput = {
  key: string,
  name: string,
  unit?: string
  numericalOrder: number
}