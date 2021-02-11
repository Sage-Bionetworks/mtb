import { Box, Button, Grid, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { FunctionComponent } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { useAsync } from '../../../helpers/AsyncHook'
import { useUserSessionDataState } from '../../../helpers/AuthContext'
import { useStudyBuilderInfo } from '../../../helpers/hooks'
import ParticipantService from '../../../services/participants.service'
import StudyService from '../../../services/study.service'
import { EnrollmentType, ParticipantAccountSummary } from '../../../types/types'
import CollapsibleLayout from '../../widgets/CollapsibleLayout'
import HideWhen from '../../widgets/HideWhen'
import StudyTopNav from '../StudyTopNav'
import AddParticipants from './AddParticipants'
import EnrollmentSelector from './EnrollmentSelector'
import ParticipantTableGrid from './ParticipantTableGrid'

const useStyles = makeStyles(theme => ({
  root: {},
  switchRoot: {
    //padding: '8px'
  },
}))

type ParticipantManagerOwnProps = {
  title?: string
  paragraph?: string
  studyId?: string
}

const participantRecordTemplate: ParticipantAccountSummary = {
  status: 'unverified',
  isSelected: false,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  id: '',
  externalIds: {},
}
type keys = keyof ParticipantAccountSummary

type ParticipantManagerProps = ParticipantManagerOwnProps & RouteComponentProps

const ParticipantManager: FunctionComponent<ParticipantManagerProps> = () => {
  let { id } = useParams<{ id: string }>()
  const [isEdit, setIsEdit] = React.useState(false)

  const handleError = useErrorHandler()
  const classes = useStyles()
  //if you need search params use the following
  //const { param } = useParams<{ param: string}>()
  //<T> is the type of data you are retrieving
  const { token } = useUserSessionDataState()
  const {
    data: studyData,
    status: studyStatus,
    error: studyError,
    setData: setStudyData,
  } = useStudyBuilderInfo(id)
  const {
    data: participantData,
    status,
    error,
    run,
    setData: setParticipantData,
  } = useAsync<ParticipantAccountSummary[]>({
    status: 'PENDING',
    data: null,
  })
  const [exportData, setExportData] = React.useState<any[] | null>(null)

  const updateEnrollment = async(type: EnrollmentType) => {
    let study = studyData!.study
    study.options = {...study.options, enrollmentType: type}

    const updatedStudy = await StudyService.updateStudy(study, token!)
    setStudyData({...studyData, study})
  }

  React.useEffect(() => {
    if (!participantData) {
      return
    }
    const result = participantData.map(record => {
      return {
        healthCode: record.id,
        clinicVisit: '',
        status: record.status,
        referenceId: record.studyExternalId,
        notes: '',
      }
    })
    setExportData(result)
  }, [participantData])

  React.useEffect(() => {
    if (!id) {
      return
    }
    ///your async call
    return run(ParticipantService.getParticipants('mtb-user-testing', token!))
  }, [id, run])

  if (status === 'PENDING') {
    return <>loading component here</>
  } else if (status === 'REJECTED') {
    handleError(error!)
  } else if (status === 'RESOLVED') {
    return (
      <>
        <StudyTopNav studyId={id} currentSection={''}></StudyTopNav>{' '}
        <Box px={3} py={2}>
          Study ID: {id}
        </Box>
        {!studyData?.study.options?.enrollmentType && <EnrollmentSelector callbackFn={(type: EnrollmentType)=> updateEnrollment(type)}></EnrollmentSelector>}
        {studyData?.study.options?.enrollmentType &&(<>
        {studyData.study.options.enrollmentType}
        <Box px={3} py={2}>
          <Grid component="label" container alignItems="center" spacing={0}>
            <Grid item>View</Grid>
            <Grid item>
              <Switch
                checked={isEdit}
                classes={{ root: classes.switchRoot }}
                onChange={e => setIsEdit(e.target.checked)}
                name="viewEdit"
              />
            </Grid>
            <Grid item>Edit</Grid>
          </Grid>
          <Box>
            <HideWhen hideWhen={!isEdit}>
              <div style={{ display: 'inline' }}>
                <Button>Move to</Button>

                <Button>Unlink phone number</Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </div>
            </HideWhen>
            <Button>Download</Button>
          </Box>
        </Box>
        <CollapsibleLayout
          expandedWidth={300}
          isFullWidth={true}
          isHideContentOnClose={true}
        >
          <AddParticipants
            studyId={id!}
            token={token!}
            enrollmentType={'ID'}
          ></AddParticipants>
          <Box py={0} pr={3} pl={2}>
            <ParticipantTableGrid
              rows={participantData || []}
              studyId={'mtb-user-testing'}
            ></ParticipantTableGrid>
          </Box>

          <Box textAlign="center" pl={2}>ADD A PARTICIPANT</Box>
        </CollapsibleLayout></>)}
      </>
    )
  }
  return <>bye</>
}
export default ParticipantManager
