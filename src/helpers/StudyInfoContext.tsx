import * as React from 'react'
import { Schedule } from '../types/scheduling'
import { Study } from '../types/types'

export type StudyInfoData = {
  study: Study
  schedule?: Schedule
}

type ActionType = 'SET_ALL' | 'SET_STUDY' | 'SET_SCHEDULE'

type Action = { type: ActionType; payload: StudyInfoData }
type Dispatch = (action: Action) => void

type StudyInfoProviderProps = { children: React.ReactNode }

const initialState: StudyInfoData| {} = {}

const StudyInfoStateContext = React.createContext<StudyInfoData | undefined>(
  undefined,
)
const StudyInfoDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function studyInfoReducer(state: StudyInfoData, action: Action): StudyInfoData {
  switch (action.type) {
    case 'SET_ALL': {
      console.log('setting all')
      const newState = {
        ...state,
        schedule: action.payload.schedule,
        study: action.payload.study,
      }
      console.log(JSON.stringify(newState))
      return newState
    }
    case 'SET_STUDY': {
      const newState = {
        ...state,

        study: action.payload.study,
      }

      return newState
    }
    case 'SET_SCHEDULE': {
      console.log('setting schedule')
      const newState = {
        ...state,

        schedule: action.payload.schedule,
      }

      return newState
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function StudyInfoDataProvider({ children }: StudyInfoProviderProps) {
  const [state, dispatch] = React.useReducer(
    studyInfoReducer,
    initialState as StudyInfoData,
  )

  return (
    <StudyInfoStateContext.Provider value={state}>
      <StudyInfoDispatchContext.Provider value={dispatch}>
        {children}
      </StudyInfoDispatchContext.Provider>
    </StudyInfoStateContext.Provider>
  )
}

function useStudyInfoDataState() {
  const context = React.useContext(StudyInfoStateContext)
  if (context === undefined) {
    throw new Error('useStudyInfoState must be used within a StudyInfoContext')
  }
  return context
}

function useStudyInfoDataDispatch() {
  const context = React.useContext(StudyInfoDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useStudyInfoDispatch must be used within a StudyInfoContext',
    )
  }
  return context
}

export {
  StudyInfoDataProvider,
  useStudyInfoDataState,
  useStudyInfoDataDispatch,
}
