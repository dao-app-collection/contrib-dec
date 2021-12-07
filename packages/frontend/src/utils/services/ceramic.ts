import { CeramicClient } from '@ceramicnetwork/http-client'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { Ed25519Provider } from 'key-did-provider-ed25519'

const API_URL = 'https://ceramic-clay.3boxlabs.com' // 'https://gateway.ceramic.network'

export enum CeramicSchema {
  BUCKET_META_DATA = 'k3y52l7qbv1fryfanod9dhaqx4ktq9vavxeunj6db6lko4qyttn3gsw663xon6l8g',
  TASK_META_DATA = 'k6zn3rc3v8qin1nhs5janurq194ioqf45aeumk07spnm19d0ob0v0iqywc2otkluxtg8vxtcp321881rtw6vdol15chnpt6r2obrdmyhaisfaodlbxdyjpy',
}

export type BucketMetaDataInput = {
  schema: CeramicSchema.BUCKET_META_DATA
  data: {
    title: string
    description: string
  }
}

export type TaskMetaDataInput = {
  schema: CeramicSchema.TASK_META_DATA
  data: {
    title: string
    description: string
  }
}

type CeramicInput = BucketMetaDataInput | TaskMetaDataInput

class Ceramic {
  ceramic: CeramicClient

  constructor() {
    this.ceramic = new CeramicClient(API_URL)

    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(this.ceramic),
    }

    const seed = new Uint8Array([
      6, 190, 125, 152, 83, 9, 111, 202, 6, 214, 218, 146, 104, 168, 166, 110, 202, 171, 42, 114,
      73, 204, 214, 60, 112, 254, 173, 151, 170, 254, 250, 2,
    ])

    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver })
    this.ceramic.did = did
  }

  authenticate = async () => {
    await this.ceramic.did?.authenticate()
  }

  create = async (input: CeramicInput): Promise<string> => {
    if (!this.ceramic.did) {
      throw new Error('Missing did id')
    }

    const doc2 = await TileDocument.create(
      this.ceramic,
      {
        title: input.data.title,
        description: input.data.description,
      },
      {
        schema: input.schema,
        controllers: [this.ceramic.did.id],
      }
    )

    return doc2.id.toString()
  }

  read = async (id: string): Promise<void | CeramicInput['data']> => {
    try {
      const data = await this.ceramic.loadStream(id)
      return data.content
    } catch (e) {
      console.error(e)
    }
  }

  update = async () => {
    // await doc2.update({
    //   title: 'Client Document',
    //   description: 'This document is now also updated from the http client',
    // })
  }
}

export default new Ceramic()

// ceramic create tile --content '
//  {
//     "$schema": "http://json-schema.org/draft-07/schema#",
//     "properties": {
//         "title": {
//         "type": "string"
//         },
//         "description": {
//         "type": "string"
//         }
//     },
//     "type": "object",
//     "additionalProperties": false,
//     "required": ["title", "description"]
// }
// '

// ceramic commits streamID
