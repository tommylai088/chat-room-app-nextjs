import { IMessage } from '@/libs/interfaces';
import { fetcher } from '@/libs/utils/api.util';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

interface Page {
  items: IMessage[]
  nextCursor: string | null
}

export function useMessages(receiverId?: string) {
  // key swr key
  const getKey: SWRInfiniteKeyLoader = (_pageIndex, previousPage) => {
    if (!receiverId) return null

    // Previous page
    if (!previousPage) {
      return `/messages?nextCursor=${receiverId}`
    }
  
    if (!previousPage.nextCursor) {
      return null
    }
    // With cursor
    return `/messages?receiverId=${receiverId}&nextCursor=${previousPage.nextCursor}`
  }

  const {
    data,           // Page[]
    size,           // page 
    setSize,        // next page
    error,
    isValidating,
    mutate,         // Update local data
  } = useSWRInfinite<Page>(getKey, fetcher)

  const messages: IMessage[] = (data ?? []).reduceRight<IMessage[]>(
    (acc, page) => {
      // Re order by old to new
      return acc.concat(page.items)
    },
    []
  )

  // Check has more
  const hasMore = Boolean(data?.[data.length - 1]?.nextCursor)

  // Scroll top load next page
  const loadMore = () => {
    if (!isValidating && hasMore) {
      setSize(size + 1)
    }
  }

  // Append message
  const appendMessage = async (msg: IMessage) => {
    await mutate(pages => {
      if (!pages) return pages
      const newPages = pages.map(p => ({
        ...p,
        items: [...p.items]
      }))
      // Push to latest page
      newPages[0].items.push(msg)
      return newPages
    }, false /* Not revalidate */)
  }
  return {
    messages,
    isLoading: isValidating && size === 0,
    isLoadingMore: isValidating && size > 0,
    error,
    hasMore,
    loadMore,
    appendMessage,
  }
}