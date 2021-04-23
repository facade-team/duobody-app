import { Platform } from 'react-native'
import * as Print from 'expo-print'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { COLORS } from './constants'

export const createHTML = ({
  content = '',
  styles = '',
  sholudRemovePageMargin = true,
} = {}) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Example PDF</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap');

                html {
                    height: 100%;
                }
                body {
                    font-size: 16px;
                    margin: 0;
                    color: ${COLORS.black};
                    min-height: 100%;
                    overflow-x: hidden;
                    font-family: 'Red Hat Display', sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                @page {
                    ${sholudRemovePageMargin ? 'margin: 0;' : ''}
                    background: red;
                }

                h1 {
                    margin-top: 0;
                    text-align: center;
                    background: rgb(255, 196, 0);
                    padding: 30px;
                    font-weight: 700;
                }

                .img-fluid {
                    width: 100%;
                    height: auto;
                }

                .container {
                    padding: 15px;
                }

                ${styles}
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `
}

export const createAndSavePDF = async (html) => {
  try {
    let isShared = false
    const { uri } = await Print.printToFileAsync({ html })
    if (Platform.OS === 'ios') {
      isShared = await Sharing.shareAsync(uri)
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync()

      if (permission.granted) {
        await MediaLibrary.createAssetAsync(uri)
        isShared = true
      }
    }

    if (!isShared) {
      throw new Error('Something went wrong...')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
