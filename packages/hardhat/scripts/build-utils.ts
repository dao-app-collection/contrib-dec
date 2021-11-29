import fs from 'fs'
import path from 'path'

export const folderExists = (folderDirPath: string): void => {
  if (!fs.existsSync(folderDirPath)) {
    fs.mkdirSync(folderDirPath)
  }
}

export const jsonStringify = (value: string): string => {
  return JSON.stringify(value, null, 2)
}

const EXPORTED_GENERATED__DIR = path.join(__dirname, '../../frontend/src/generated')
const EXPORTED_HARDHAT_DIR = path.join(__dirname, '../../hardhat')
const EXPORTED_GENERATED_CONTRACTS_DIR = path.join(EXPORTED_GENERATED__DIR, '/contracts')
const EXPORTED_TYPECHAIN_TYPES_DIR = path.join(EXPORTED_GENERATED__DIR, '/types')

export const paths = {
  EXPORTED_GENERATED__DIR,
  EXPORTED_HARDHAT_DIR,
  EXPORTED_GENERATED_CONTRACTS_DIR,
  EXPORTED_TYPECHAIN_TYPES_DIR,
}
