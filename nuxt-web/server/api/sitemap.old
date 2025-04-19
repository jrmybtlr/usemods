import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[]
  const sections = ['docs', 'intro']

  return sections.flatMap(section =>
    contentList
      .filter(page => page._path?.startsWith(`/${section}`))
      .map((page) => {
        return asSitemapUrl({
          loc: `/${section}${page._path?.replace(`/${section}`, '')}`,
          lastmod: page.updatedAt,
        })
      }),
  )
})
