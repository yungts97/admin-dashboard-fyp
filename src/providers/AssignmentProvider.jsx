import React, { useEffect, useReducer, useContext, createContext } from 'react'
import HttpHelper from 'utilities/HttpHelper'
import PropTypes from 'prop-types'
import { useAuthProvider } from 'providers/AuthProvider'

const PROVIDERNAME = 'AssignmentProvider'
const CLINICIAN_ASSIGNMENT_KEY = 'clinicianAssignment'
export const AssignmentProviderDispatchMethodConstants = {
  SAVE_ASSGINMENT: 'saveAssignments',
  UPDATEASSIGNMENT: 'updateAssignment',
  RESETSTATE: 'resetState',
  REMOVEASSIGNMENT: 'removeAssignment',
  REFRESHFROMAPI: 'refreshFromAPI',
  GENERATEREPORT: 'generatereport',
  COMPLETEREPORT: 'completereport',
  RAISEERROR: 'error'
}

const defaultAssignmentState = []

const AssignmentContext = createContext(defaultAssignmentState)

export function useAssignmentProvider () {
  return useContext(AssignmentContext)
}

export function AssignmentProvider ({ children }) {
  const [state, dispatch] = useReducer(
    reducerClinician,
    defaultAssignmentState
  )
  const [authState] = useAuthProvider()

  async function fetchAllAssignments (token) {
    console.log(`${PROVIDERNAME}: Retrieving Clinician Assignments.`)
    if (token) {
      try {
        let assignments = localStorage.getItem(CLINICIAN_ASSIGNMENT_KEY)
        if (assignments) {
          console.log(`${PROVIDERNAME}: Retrieving assignments from storage.`)
          assignments = JSON.parse(assignments)
          // @ts-ignore
          dispatch({
            type: AssignmentProviderDispatchMethodConstants.SAVE_ASSGINMENT,
            payload: assignments
          })
        } else {
          console.log(`${PROVIDERNAME}: Retrieving Assignments from API.`)
          const res = await HttpHelper.Get.GetAllClinicianAssignments(token)
          if (res.error) {
            throw Error(res.message)
          } else {
            // @ts-ignore
            dispatch({
              type: AssignmentProviderDispatchMethodConstants.SAVE_ASSGINMENT,
              payload: res.data
            })
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  async function fetchData () {
    if (authState.token) {
      fetchAllAssignments(authState.token)
    }
  }

  useEffect(() => {
    if (authState.token) {
      console.log(`${PROVIDERNAME}: Initiate Provider.`)
      fetchData()
    } else {
      console.log(`${PROVIDERNAME}: Removing clinician data from storage.`)
      // @ts-ignore
      dispatch({ type: AssignmentProviderDispatchMethodConstants.RESETSTATE })
    }
  }, [authState.userToken])

  return (
    <AssignmentContext.Provider value={[state, dispatch]}>
      {children}
    </AssignmentContext.Provider>
  )
}

AssignmentProvider.propTypes = {
  children: PropTypes.node.isRequired
}

function reducerClinician (state, action) {
  if (action.payload !== {}) {
    switch (action.type) {
      case AssignmentProviderDispatchMethodConstants.SAVE_ASSGINMENT:
        localStorage.setItem(CLINICIAN_ASSIGNMENT_KEY, JSON.stringify(action.payload))
        return action.payload
      case AssignmentProviderDispatchMethodConstants.RESETSTATE:
        localStorage.removeItem(CLINICIAN_ASSIGNMENT_KEY)
        return defaultAssignmentState
      default:
        return state
    }
  }
}
