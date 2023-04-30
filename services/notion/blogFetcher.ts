const {
   Client,
   APIErrorCode, 
   isNotionClientError, 
   ClientErrorCode
   } = require("@notionhq/client")

// こいつをgithub actionsに定期実行してもらう

export async function fetchBlog(){
  // Initializing a client
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  let pages = []

  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    })
    // const results = res.results.map((page) => {
    //   return {
    //     id: page.id,
    //     title: page.properties.Title.title[0].text.content,
    //     body: page.properties.Body.rich_text[0].text.content,
    //     createdTime: page.created_time,
    //     lastEditedTime: page.last_edited_time,
    //   }
    // })
    // file_name res.results[0].properties.file_name.rich_text[0].plain_text
    // console.log(res.results[0])
    // console.log(res.results[0].properties.file_name.rich_text)
    console.log(res.results)
    return res.results
  } catch (error) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.log('error code is', error.code, 'request time out')
          break
        case APIErrorCode.ObjectNotFound:
          console.log('error code is', error.code, 'object not found')
          break
        case APIErrorCode.Unauthorized:
          console.log('error code is', error.code, 'unauthorized')
          break
        default:
          // you could even take advantage of exhaustiveness checking
          assertNever(error.code)
      }
    }
  }
}

function assertNever(x: string): never {
  throw new Error("error code is" + x);
}

