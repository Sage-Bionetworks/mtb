import {
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Paper
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import React, { FunctionComponent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo_mtb.svg'
import { latoFont } from '../../style/theme'
import AccountLogin from '../account/AccountLogin'
import Logout from '../account/Logout'



const drawerWidth = '285px'

const useStyles = makeStyles(theme => ({
  toolbarWrapper: {
    height: '104px',
    display: 'flex',
    borderBottom: '1px solid #EAEAEA',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  toolbar: {
    padding: theme.spacing(4, 2),
    justifyContent: 'space-between',
    overflowX: 'auto',
    minHeight: '40px',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    textDecoration: 'none',

    flexShrink: 0,
    //agendel todo Lato
    fontFamily: latoFont,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '18px',
    color: '#393434',
  },
  selectedLink: {
    fontWeight: 'bold',
    color: '#393434;',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
    '&::after': {
      content: '',
      display: 'table',
      clear: 'both',
    },
  },
  login: {
    borderLeft: '1px solid #EAEAEA',
    padding: theme.spacing(4,2 ),
    margin: theme.spacing(-4, 0, -4, 2)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerMenuItem: {
    textDecoration: 'none',

    flexShrink: 0,
    //agendel todo Lato
    fontFamily: latoFont,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '18px',
    color: '#393434',
    padding: theme.spacing(1.5, 0, 1.5, 5)
  },
  drawerMenuSeparator: {
    height: '2px',
    margin: '20px 0px',
    backgroundColor: '#2A2A2A',
  },

  drawerPaper: {
    width: drawerWidth,
  },
}))

type AppTopNavProps = {
  routes: { name: string; path: string; isRhs?: boolean }[]
  token?: string
}

const MenuLinks: FunctionComponent<
  AppTopNavProps & {
    className: string
    activeClassName: string
  }
> = ({ routes, className, activeClassName }) => {

  let links = routes.map(route => (
    <NavLink
      to={route.path}
      key={route.name}
      className={className}
      activeClassName={activeClassName}
    >
      {route.name}
    </NavLink>
  ))

  return <>{links}</>
}

const MenuLinksRhs: FunctionComponent<
  AppTopNavProps & {
    className: string
    activeClassName: string
  }
> = ({ routes, token, className, activeClassName, children }) => {
  const classes = useStyles()
  let links
  if (token) {
    links = Array.isArray(children) ? children[0] : <></>
  } else {
    links = [
      routes.map(route => (
        <NavLink
          to={route.path}
          key={route.name}
          className={className}
          activeClassName={activeClassName}
        >
          {route.name}
        </NavLink>
      )),
      Array.isArray(children) ? children[1] : <></>,
    ]
  }

  return <>{links}</>
}

const AppTopNav: FunctionComponent<AppTopNavProps> = ({
  routes,

  token,
  ...props
}: AppTopNavProps) => {
  const classes = useStyles()
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  return (
    <>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="end"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={classes.menuButton}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Paper className={classes.toolbarWrapper} elevation={0}>
          <img src={Logo} key="Mobile Toolbox" className={classes.toolbar} alt="logo" />
          <Toolbar
            component="nav"
            variant="dense"
            disableGutters
            className={classes.toolbar}
          >
            <MenuLinks
              className={classes.toolbarLink}
              activeClassName={classes.selectedLink}
              routes={routes.filter(route => route.name && !route.isRhs)}
            />
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            disableGutters
            className={classes.toolbar}
          >
            <MenuLinksRhs
              className={classes.toolbarLink}
              activeClassName={classes.selectedLink}
              routes={routes.filter(route => route.name && route.isRhs)}
              token={token}
            >
              <div className={classes.login}>
                <Logout
                  element={
                    <Button variant="text" className={classes.drawerMenuItem}>
                      Log out
                    </Button>
                  }
                ></Logout>
              </div>
              <div className={classes.login}>
                <Button
                  variant="text"
                  className={classes.toolbarLink}
                  onClick={() => setIsSignInOpen(true)}
                >
                  Sign in
                </Button>
              </div>
            </MenuLinksRhs>
          </Toolbar>
        </Paper>
      </Hidden>
      <nav className={classes.drawer}>
        <Drawer
          variant="temporary"
          anchor="right"
          open={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <MenuLinks
            className={classes.drawerMenuItem}
            activeClassName={classes.selectedLink}
            routes={routes.filter(route => route.name && !route.isRhs)}
          />

          <Divider className={classes.drawerMenuSeparator} />
          <MenuLinksRhs
            className={classes.drawerMenuItem}
            activeClassName={classes.selectedLink}
            routes={routes.filter(route => route.name && route.isRhs)}
            token={token}
          >
            <div className={classes.drawerMenuItem}>
              <Logout
                element={
                  <Button
                    variant="text"
                    className={classes.drawerMenuItem}
                    style={{
                      paddingLeft: '0',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Log out
                  </Button>
                }
              ></Logout>
            </div>
            <div className={classes.drawerMenuItem}>
              <Button
                variant="text"
                className={classes.drawerMenuItem}
                onClick={() => setIsSignInOpen(true)}
                style={{
                  paddingLeft: '0',
                  backgroundColor: 'transparent',
                }}
              >
                Sign in
              </Button>
            </div>
          </MenuLinksRhs>
        </Drawer>
      </nav>
      <Dialog
        open={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <AccountLogin
            {...props}
            callbackFn={() => setIsSignInOpen(false)}
          ></AccountLogin>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AppTopNav
