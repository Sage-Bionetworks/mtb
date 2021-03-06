import {
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'
import React from 'react'
import {
  HDWMEnum,
  SessionScheduleStartType,
  StartDate as StartDateType
} from '../../../types/scheduling'
import Duration from './Duration'
import SchedulingFormSection from './SchedulingFormSection'

export interface StartDateProps {
  startDate: StartDateType
  onChange: Function
}

const StartDate: React.FunctionComponent<StartDateProps> = ({
  startDate,
  onChange,
}: StartDateProps) => {
  const [startDateOffset, setStartDateOffset] = React.useState(startDate.offset)

  React.useEffect(() => {
    setStartDateOffset(startDate.offset)
  }, [startDate.offset])

  const changeStartDate = (type: SessionScheduleStartType) => {
    if (type !== startDate.type) {
      onChange({ ...startDate, type })
    }
    // } else {
    //  if (startDate.type !== 'NDAYS_DAY1') {
    //  onChange({ ...startDate, type })
    // }
    //}
  }

  return (
    <SchedulingFormSection label={'Session Starts On:'}>
      <RadioGroup
        aria-label="Start Date"
        name="startDate"
        value={startDate.type}
        onChange={e =>
          changeStartDate(e.target.value as SessionScheduleStartType)
        }
      >
        <FormControlLabel value={'DAY1'} control={<Radio />} label="Day 1" />
        <FormControlLabel
          control={
            <>
              <Radio value={'NDAYS_DAY1'} />{' '}
              <Duration
                onFocus={() => changeStartDate('NDAYS_DAY1')}
                onChange={e => {
                  setStartDateOffset(e.toString())
                  onChange({
                    ...startDate,
                    offset: e,
                  })
                }}
                durationString={startDateOffset}
                unitLabel="Repeat Every"
                numberLabel="frequency number"
                unitData={HDWMEnum}
              ></Duration>
            </>
          }
          label="from Day 1"
        />
      </RadioGroup>
    </SchedulingFormSection>
  )
}

export default StartDate
