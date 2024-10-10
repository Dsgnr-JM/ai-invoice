import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import dotenv from 'dotenv'
import fs from 'node:fs'
import z from 'zod'

dotenv.config()

// const schema = z.object({
//   products:z.array(
//     z.object({
//       product_code: z.string(),
//       product_description: z.string(),
//       quantity: z.string(),
//       unit_price: z.string(),
//       total: z.string()
//     })
//   )
// })

export async function addImageForConvertToJson(image){
const {object} = await generateObject({
  model: google('gemini-1.5-flash'),
  output: 'no-schema',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'I have an image of an invoice. Extract the data from the product table in the invoice and send it to me in JSON format. This JSON should contain. if possible, the following fields: product code, product description, quantities,unit prices and total. If there is an error you must still return a JSON but with an error message. The text that you must return at the end is JSON text, no markdown',
        },
        {
          type: 'file',
          data: image,
          mimeType: 'image/jpeg',
        },
      ],
    },
  ],
});
/*const textParsed = await text.replace(/```|json/,'');
const endResult = await textParsed*/
return object

}

