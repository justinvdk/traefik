import {
  Box,
  Button,
  CSS,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Flex,
  Link,
  Text,
  Tooltip,
} from '@traefik-labs/faency'
import { useContext, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiBookOpen, FiChevronLeft, FiGithub, FiHeart, FiHelpCircle } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

import { DARK_PRIMARY_COLOR, LIGHT_PRIMARY_COLOR } from '../Page'

import ThemeSwitcher from 'components/ThemeSwitcher'
import { VersionContext } from 'contexts/version'
import { useRouterReturnTo } from 'hooks/use-href-with-return-to'
import useHubUpgradeButton from 'hooks/use-hub-upgrade-button'
import { useIsDarkMode } from 'hooks/use-theme'

const TopNavBarBackLink = () => {
  const { returnTo, returnToLabel } = useRouterReturnTo()
  const { pathname } = useLocation()

  if (!returnTo || pathname.includes('hub-dashboard')) return <Box />

  return (
    <Flex css={{ alignItems: 'center', gap: '$2' }}>
      <Link href={returnTo}>
        <Button as="div" ghost variant="secondary" css={{ boxShadow: 'none', p: 0, pr: '$2' }}>
          <FiChevronLeft style={{ paddingRight: '4px' }} />
          {returnToLabel || 'Back'}
        </Button>
      </Link>
    </Flex>
  )
}

export const TopNav = ({ css }: { css?: CSS; }) => {
  const { version } = useContext(VersionContext)

  const parsedVersion = useMemo(() => {
    if (!version) {
      return 'master'
    }
    if (version === 'dev') {
      return 'master'
    }
    const matches = version.match(/^(v?\d+\.\d+)/)
    return matches ? 'v' + matches[1] : 'master'
  }, [version])

  return (
    <>
      <Flex as="nav" role="navigation" justify="space-between" align="center" css={{ mb: '$6', ...css }}>
        <TopNavBarBackLink />
        <Flex gap={2} align="center">
          <ThemeSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button ghost variant="secondary" css={{ px: '$2', boxShadow: 'none' }} data-testid="help-menu">
                <FiHelpCircle size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end" css={{ zIndex: 9999 }}>
                <DropdownMenuGroup>
                  <DropdownMenuItem css={{ height: '$6', cursor: 'pointer' }}>
                    <Link
                      href={`https://doc.traefik.io/traefik/${parsedVersion}`}
                      target="_blank"
                      css={{ textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}
                    >
                      <Flex align="center" gap={2}>
                        <FiBookOpen size={20} />
                        <Text>Documentation</Text>
                      </Flex>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem css={{ height: '$6', cursor: 'pointer' }}>
                    <Link
                      href="https://github.com/traefik/traefik/"
                      target="_blank"
                      css={{ textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}
                    >
                      <Flex align="center" gap={2}>
                        <FiGithub size={20} />
                        <Text>Github Repository</Text>
                      </Flex>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </Flex>
      </Flex>
    </>
  )
}
