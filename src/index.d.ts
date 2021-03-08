/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="declarations.d.ts" />
import Provider from './scripts/provider'

declare global {
  interface Window {
    solanaProvider: Provider
    ACTION_TYPE: any
  }
}

export {}
