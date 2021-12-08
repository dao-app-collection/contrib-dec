import Head from 'next/head'
import { FC } from 'react'

type Meta = { name: string; content: string } | { property: string; content: string }

type Props = {
  description?: string
  meta?: Meta[]
  keywords?: string[]
  title?: string
  image?: string
}

const defaultDescription = 'DAO contribution and experience, validated on-chain.'

const SEO: FC<Props> = ({ description, meta = [], keywords = [], title, image }) => {
  const metaTitle = title
  const metaDescription = description || defaultDescription

  //   let metaImage = `${config.SITE_URL}/meta-images/default.png`

  //   if (image) {
  //     if (image.startsWith('http')) {
  //       metaImage = image
  //     } else if (!image.startsWith('/')) {
  //       throw new Error('Image needs to be relative')
  //     } else {
  //       metaImage = `${config.SITE_URL}${image}`
  //     }
  //   }

  const metaImage = '/hej.png'
  const metaContent = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: metaTitle,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:image',
      content: metaImage,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'image',
      content: metaImage,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: metaImage,
    },
    {
      name: 'twitter:creator',
      content: 'orakuru_ork',
    },
    {
      name: 'twitter:title',
      content: metaTitle,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },

    ...meta,
  ]

  if (keywords.length > 0) {
    metaContent.push({
      name: 'keywords',
      content: keywords.join(', '),
    })
  }

  return (
    <Head>
      <title key="title">{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {metaContent.map((m) => (
        <meta {...m} key={'name' in m ? m.name : m.property} />
      ))}

      <meta charSet="utf-8" />
    </Head>
  )
}

export default SEO
