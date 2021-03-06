import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import BlackXIcon from '../../../assets/black_x_icon.svg'
import SearchIcon from '../../../assets/search_icon.svg'
import WhiteSearchIcon from '../../../assets/white_search_icon.svg'
import { Study } from '../../../types/types'

const useStyles = makeStyles(theme => ({
  participantIDSearchBar: {
    backgroundColor: 'white',
    outline: 'none',
    height: '38px',
    width: '220px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    padding: theme.spacing(0.7),
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '0px',
    fontSize: '13px',
  },
  topButtons: {
    marginRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '36px',
  },
  buttonImage: {
    marginRight: theme.spacing(0.5),
  },
  searchIconContainer: {
    width: '42px',
    height: '38px',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'black',
      boxShadow: '1px 1px 1px rgb(0, 0, 0, 0.75)',
    },
    borderRadius: '0px',
    minWidth: '0px',
  },
  blackXIconButton: {
    marginLeft: '195px',
    position: 'absolute',
    minWidth: '0px',
    width: '18px',
    height: '18px',
    minHeight: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    '&:hover': {
      backgroundColor: 'rgb(0, 0, 0, 0.2)',
    },
    display: 'flex',
  },
  blackXIcon: {
    width: '10px',
    height: '10px',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}))

type ParticipantSearchProps = {
  study: Study
  token: string
  onReset: Function
  onSearch: Function
}

const ParticipantSearch: React.FunctionComponent<ParticipantSearchProps> = ({
  study,
  token,
  onReset,
  onSearch,
}) => {
  const classes = useStyles()
  const [
    isSearchingForParticipant,
    setIsSearchingForParticipant,
  ] = React.useState(false)

  // True if the user is currently trying to search for a particular particpant
  const [isSearchingUsingId, setIsSearchingUsingID] = React.useState(false)
  // Reference to the input component for searching for a participant using ID.
  const inputComponent = React.useRef<HTMLInputElement>(null)

  const handleSearchParticipantRequest = async () => {
    const searchedValue = inputComponent.current?.value
      ? inputComponent.current?.value
      : ''
    /* const result = await ParticipantService.getParticipantWithId(
        study.identifier,
        token!,
        searchedValue,
      )
      const realResult = result ? [result] : null
      const totalParticipantsFound = result ? 1 : 0
      setParticipantData({ items: realResult, total: totalParticipantsFound })*/
    setIsSearchingUsingID(true)
    onSearch(searchedValue)
  }

  const handleResetSearch = async () => {
    inputComponent.current!.value = ''
    setIsSearchingUsingID(false)
    /* const result = await run(getParticipants(study!.identifier, token!))
      setParticipantData({ items: result.items, total: result.total })*/
    onReset()
  }

  return isSearchingForParticipant ? (
    <div className={classes.inputRow}>
      <input
        placeholder="Participant IDs"
        className={classes.participantIDSearchBar}
        ref={inputComponent}
        style={{
          paddingRight: isSearchingUsingId ? '28px' : '4px',
        }}
      ></input>
      {isSearchingUsingId && (
        <Button
          className={classes.blackXIconButton}
          onClick={handleResetSearch}
        >
          <img
            src={BlackXIcon}
            className={classes.blackXIcon}
            alt="black-x-icon"
          ></img>
        </Button>
      )}
      <Button
        className={classes.searchIconContainer}
        onClick={handleSearchParticipantRequest}
      >
        <img src={WhiteSearchIcon} alt="white-search-icon"></img>
      </Button>
    </div>
  ) : (
    <Button
      className={classes.topButtons}
      onClick={() => {
        setIsSearchingForParticipant(true)
      }}
    >
      <img
        src={SearchIcon}
        className={classes.buttonImage}
        alt="seach-icon"
      ></img>
      Find Participant
    </Button>
  )
}

export default ParticipantSearch
