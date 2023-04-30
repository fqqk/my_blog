import notionRichText from 'types/notionRichText'

type notionPageType = {
    object: 'page',
    id: string,
    created_time: string,
    last_edited_time: string,
    created_by: { object: 'user', id: string },
    last_edited_by: { object: 'user', id: string },
    cover: string | null,
    icon: { type: 'emoji', emoji: string },
    parent: {
      type: 'database_id',
      database_id: string
    },
    archived: boolean,
    properties: {
      categories: { id: string, type: 'multi_select', multi_select: string[] },
      file_name: { id: 'rxsW', type: 'rich_text', rich_text: Array<notionRichText> },
      title: { id: 'title', type: 'title', title: string[] }
    },
    url: string
}

export default notionPageType