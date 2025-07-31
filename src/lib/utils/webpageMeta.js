import { reservePages, getReservePage } from '@/lib/utils/reservePage.js'

export function generateWebpageMetaData(page_name, webpage) {
  
    if(webpage.notFound){
      return {
        title: '404',
      }
    }
    else if(!webpage?.webpage_node && reservePages.includes(page_name)){
      webpage.webpage_node = getReservePage(page_name)
    }

    return {
      title: `${webpage?.name||''} | ${webpage?.webpage_node?.name||''}`,
      description: webpage?.webpage_node?.data?.description||'',
      keywords: webpage?.webpage_node?.data?.keywords||'',
      icons: {
        icon: { url: webpage?.favicon||null, type: 'image/png' },
        // shortcut: { url: '/favicon.svg', type: 'image/svg' },
      },
      openGraph: {
        title:webpage?.webpage_node?.data?.og_title||'',
        description:webpage?.webpage_node?.data?.og_description||'',
        images: [webpage?.webpage_node?.data?.og_image1||'', webpage?.webpage_node?.data?.og_image2||''],
      },
    };
  }