import { ProRes, ActionsFiles, File, ConvertStatus } from "."
import { PROPRES_422, PROPRES_HQ, PROPRES_4444, PROPRES_LT, PROPRES_PROXY } from './recipes'

export const removeFileExtension = (fileName: string) => {
  if (fileName.length <= 0) {
    return fileName
  }
  for (let i = fileName.length; i > 0; i --) {
    if (fileName[i] === '.') {
      return fileName.substring(0, i)
     }
  }
}

export const getRecipe = (profile: ProRes) => {
  switch (profile) {
    case ProRes.PROXY:
      return PROPRES_PROXY
    case ProRes.LT:
      return PROPRES_LT
    case ProRes.STANDARD:
      return PROPRES_422
    case ProRes.HQ:
      return PROPRES_HQ
    case ProRes.Quad4:
      return PROPRES_4444
    default:
      return PROPRES_422
  }
 }
export const getPresetNumber = (profile: ProRes) => {
  switch (profile) {
    case ProRes.PROXY:
      return 0
    case ProRes.LT:
      return 1
    case ProRes.STANDARD:
      return 2
    case ProRes.HQ:
      return 3
    case ProRes.Quad4:
      return 4
    default:
      return 1
  }
}

export const useMakeUpdate = (dispatchFileList: any, filesList: File[]) => {

  const makeUpdate = (index: number, update: ConvertStatus) => {
    const { progress, hasEnded, errorMessage, hasStarted, isComplete } = update
    if (hasStarted && !hasEnded) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: false,
              isComplete: false,
              progress: 0,
              errorMessage: null,
            },
          },
        },
      })
    }
  
    if (hasStarted && progress) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: false,
              isComplete: false,
              progress: progress,
              errorMessage: null,
            },
          },
        },
      })
    }
  
    if (isComplete) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: true,
              isComplete: true,
              progress: 0,
              errorMessage: null,
            },
          },
        },
      })
    }
  
    if (errorMessage) {
      dispatchFileList({
        type: ActionsFiles.UpdateItem,
        payload: {
          index: index,
          item: {
            ...filesList[index],
            status: {
              hasStarted: true,
              hasEnded: true,
              isComplete: false,
              progress: 0,
              errorMessage: errorMessage,
            },
          },
        },
      })
    }
  }
  return makeUpdate
}
 