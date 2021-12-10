import { CeramicClient } from '@ceramicnetwork/http-client'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { BucketMetaData, TaskMetaData } from '../../types/all-types'

const API_URL = 'https://ceramic-clay.3boxlabs.com' // 'https://gateway.ceramic.network'

export enum CeramicSchema {
  BUCKET_META_DATA = 'k3y52l7qbv1frxqaahvbejpzb1s4mu26894ec6dfsa9eu759u69hwo1x4bohl9dz4',
  TASK_META_DATA = 'k3y52l7qbv1frxzfcxjyk2ab2zff035thikmzprd86lw0pvniyihjuyvmierv1728',
}

export type BucketMetaDataInput = {
  schema: CeramicSchema.BUCKET_META_DATA
  data: BucketMetaData
}

export type TaskMetaDataInput = {
  schema: CeramicSchema.TASK_META_DATA
  data: TaskMetaData
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

    const doc2 = await TileDocument.create(this.ceramic, input.data, {
      schema: input.schema,
      controllers: [this.ceramic.did.id],
    })

    return doc2.id.toString()
  }

  read = async <T>(id: string): Promise<void | T> => {
    try {
      const data = await this.ceramic.loadStream(id)
      return data.content
    } catch (e) {
      console.error(e)
    }
  }

  update = async (streamId: string, data: BucketMetaData | TaskMetaData) => {
    const doc = await TileDocument.load(this.ceramic, streamId)

    await doc.update(data)
  }
}

export default new Ceramic()

// ceramic create tile --content '
// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "properties": {
//           "name": {
//                   "type": "string"
//           },
//           "description": {
//                   "type": "string"
//           },
//           "website": {
//                   "type": "string"
//           },
//           "discord": {
//                   "type": "string"
//           },
//           "logo": {
//                   "type": "string"
//           },
//           "primaryColor": {
//                   "type": "string"
//           }
//   },
//   "type": "object",
//   "additionalProperties": true,
//   "required": ["name", "description", "website", "discord", "logo", "primaryColor"]
// }

// only update by task owner

if (typeof window !== 'undefined') {
  window.getTaskSchema = () => {
    const names = [
      'title',
      'body',
      'assignes',
      'applications',
      'taskStatus',
      'deadlineTimestamp',
      'createdTimestamp',
      'claimedTimestamp',
      'taskType',
      'experienceLevel',
      'requirements',
      'github',
      'timeCommitment',
    ]

    const properties: any = {}

    names.forEach((name) => {
      if (['assignes', 'applications', 'requirements'].includes(name)) {
        properties[name] = {
          type: 'array',
          items: {
            type: 'string',
          },
        }
      } else {
        properties[name] = {
          type: name.includes('Timestamp') ? 'integer' : 'string',
        }
      }
    })

    return JSON.stringify({
      $schema: 'http://json-schema.org/draft-07/schema#',
      properties,
      type: 'object',
      additionalProperties: true,
      required: names,
    })
  }
}

// {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "properties": {
//           "name": {
//                   "type": "string"
//           },
//           "description": {
//                   "type": "string"
//           },
//           "website": {
//                   "type": "string"
//           },
//           "discord": {
//                   "type": "string"
//           },
//           "logo": {
//                   "type": "string"
//           },
//           "primaryColor": {
//                   "type": "string"
//           }
//   },
//   "type": "object",
//   "additionalProperties": true,
//   "required": ["name", "description", "website", "discord", "logo", "primaryColor"]
// }

// ceramic commits streamID
