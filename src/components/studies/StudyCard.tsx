import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'


import clsx from 'clsx'
import { Study } from '../../types/types'

const useStyles = makeStyles({
  root: {
    width: '300px',
    border: '1px solid gray',
  },
  dragging: {
    width: '250px !important',
    height: '250px !important',
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

type StudyCardOwnProps = {
  study: Study
 
}

type StudyCardProps = StudyCardOwnProps

const StudyCard: FunctionComponent<StudyCardProps> = ({
  study,

}) => {
  const classes = useStyles()
  // const bull = <span className={classes.bullet}>•</span>

  const className = clsx({ [classes.root]: true, [classes.dragging]: false })
  //console.log('className', className)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary" gutterBottom>
          {study.name}
        </Typography>

        <Typography className={classes.title} color="textSecondary">
          {study.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StudyCard
