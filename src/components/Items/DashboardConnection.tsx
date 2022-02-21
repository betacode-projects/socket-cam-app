import { 
  ChevronDownIcon,
  CloseIcon,
  CheckIcon,
  DownloadIcon
} from '@chakra-ui/icons'

import { MdDesktopWindows, MdVideoCameraBack } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

import {
  Badge,
  Wrap,
  WrapItem,
  Text,
  Box,
  Icon,
  Tooltip
} from '@chakra-ui/react'

import QRCode from "react-qr-code"
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Config, {DashboardConfig, CameraStream} from '../../Config'
const platform = require('platform')

const DashboardConnection = (props: {dashboardName: string, remoteDashboard: DashboardConfig[], remoteVideo: CameraStream[]}) => {

  const createRemoteDashboardBadges = () => {
    return props.remoteDashboard.map((data, index) => (
      <WrapItem key={index}>
        <Tooltip label={<>ダッシュボード<br/>{getUserInfo(data.config.userAgent)}<br/>{data.config.joinedDate} に参加</>} aria-label='A tooltip'>
          <Box rounded='md' p={1} bg='cyan.100' color='cyan.800'>
            <Text fontSize='xs' fontWeight='bold'><Icon mb={1} as={FaUser}/> {data.config.name}</Text>
          </Box>
        </Tooltip>
      </WrapItem >
    ))
  }

  const createRemoteVideoBadges = () => {
    return props.remoteVideo.map((data, index) => (
      <WrapItem key={index}>
        <Tooltip label={<>カメラ<br/>{getUserInfo(data?.config?.userAgent)}<br/>{data?.config?.joinedDate ?? '不明な時刻'} に参加</>} aria-label='A tooltip'>
          <Box rounded='md' p={1} bg='purple.100' color='purple.800'>
            <Text fontSize='xs' fontWeight='bold'><Icon mb={1} as={MdVideoCameraBack}/> {data?.config?.name ?? ''}</Text>
          </Box>
        </Tooltip>
      </WrapItem >
    ))
  }

  const getUserInfo = (userAgent: string|undefined): string => {
    return platform.parse(userAgent)?.description ?? userAgent
  }
  
  return (
    <>
      <Box bg='gray.100' m={5} p={3} rounded='md'>
        <Wrap >
          <WrapItem >
            <Tooltip label="(｀･∀･´) ｼﾞｯ..." aria-label='A tooltip'>
              <Box rounded='md' p={1} bg='green.100' color='green.800'>
                <Text fontSize='xs' fontWeight='bold'><Icon mb={1} as={MdDesktopWindows}/> {props.dashboardName}</Text>
              </Box>
            </Tooltip>
          </WrapItem >
          {createRemoteDashboardBadges()}
          {createRemoteVideoBadges()}
        </Wrap>
      </Box>
    </>
  )
}

export default DashboardConnection