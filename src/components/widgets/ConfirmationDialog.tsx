import { IconButton, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import React, { FunctionComponent } from 'react'
import { ReactComponent as Delete } from '../../assets/trash.svg'
import { latoFont, poppinsFont } from '../../style/theme'

const useStyles = makeStyles(theme => ({
  dialogTitle: {},
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    padding: theme.spacing(3),
    position: 'relative',
    fontFamily: poppinsFont,
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '27px',
    textAlign: 'left',
    alignItems: 'center',
    display: 'flex',
    '& div': {
      paddingLeft: theme.spacing(2),
    },
  },
  body: {
    fontFamily: latoFont,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
  },
  confirmButton: {
    width: '74px',
    height: '49px',
    background: theme.palette.error.light,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '0px',
    fontFamily: 'Lato',
    '&:hover': {
      transform: 'translateY(1px)',
      backgroundColor: '#EDC6C6',
    },
  },
  dialogPaper: {
    width: '302px',
    height: '275px',
  },
  cancelButton: {
    width: '120px',
    height: '49px',
    outline: 'none',
    borderRadius: '0px',
    border: '1px solid black',
    background: '#FCFCFC',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Lato',
    '&:hover': {
      transform: 'translateY(1px)',
    },
  },
  dialogButtonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(2.5),
  },
}))

type ConfirmationDialogProps = {
  isOpen: boolean
  type: 'DELETE' | 'NAVIGATE'
  title?: string
  cancelText?: string
  actionText?: string
  onCancel: Function
  onConfirm: Function
  children?: JSX.Element
}

const ConfirmationDialog: FunctionComponent<ConfirmationDialogProps> = ({
  isOpen,
  onCancel,
  title = 'Navigate Away? ',
  type,
  onConfirm,
  children,
  cancelText = 'Cancel',
  actionText = 'Delete',
}) => {
  const classes = useStyles()
  const navigateBody = (
    <div>
      Looks like you have some unsaved Changes.
      <br /> Are you sure you want to leave?
    </div>
  )
  let body = type === 'NAVIGATE' ? navigateBody : children


  return (
    <Dialog
      open={isOpen}
      onClose={() => onCancel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialogTitle}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle
        id="alert-dialog-title"
        disableTypography={true}
        className={classes.title}
      >
        {type === 'DELETE' && <Delete></Delete>}
        <div>{title}</div>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => onCancel()}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogButtonsContainer}>
        <Button
          onClick={() => onCancel()}
          color="default"
          variant="contained"
          className={classes.cancelButton}
        >
          {cancelText}
        </Button>
        <Button
          onClick={() => onConfirm()}
          className={classes.confirmButton}
          variant="contained"
          autoFocus
        >
          {type=== 'NAVIGATE'?  'Continue': actionText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
