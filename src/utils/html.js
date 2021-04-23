import {
  createHTML,
  copyFromAssets,
  pickImage,
  processLocalImage,
} from './helpers'
import { COLORS } from './constants'

export const simpleHtml = (sholudRemovePageMargin = false) => () =>
  createHTML({
    content: `
    <h1>Hello, UppLabs! ${
      sholudRemovePageMargin ? "I'm without page margin!" : ''
    }</h1>
  `,
    sholudRemovePageMargin,
    styles: `
      body {
        background: ${COLORS.grey};
      }
    `,
  })
