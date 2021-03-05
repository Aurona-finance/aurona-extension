import Provider from './scripts/provider'

declare module '*.svg' {
  const content: any
  export default content
}
declare global {
  interface Window {
    solanaProvider: Provider
    ACTION_TYPE: any
  }
}
export {}
