import React, { memo } from 'react'
import * as THREE from 'three'
import type { Meta, StoryObj } from '@storybook/react'
import { BackSide } from 'three'
import {
  useGLTF,
  Center,
  Resize,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Stats,
  Box,
  useTexture,
} from '@react-three/drei'

import { Setup } from '../Setup'
import { EffectComposer, LensFlare, Vignette, Bloom } from '../../src'

function SkyBox() {
  const texture = useTexture('/digital_painting_golden_hour_sunset.jpg')

  return (
    <mesh userData={{ lensflare: 'no-occlusion' }} scale={[-1, 1, 1]} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial toneMapped={false} map={texture} side={BackSide} />
    </mesh>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Effect/LensFlare',
  component: LensFlare,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(8, 1, 10)} cameraFov={50}>
        {Story()}
      </Setup>
    ),
  ],
  tags: ['autodocs'],
  // argTypes: {
  //   debug: {
  //     control: { type: 'range', min: 0, max: 1, step: 0.01 },
  //   },
  // },
} satisfies Meta<typeof LensFlare>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => (
    <>
      <color attach="background" args={['#303035']} />

      <directionalLight intensity={3} position={[-25, 60, -60]} />

      <Box />

      <SkyBox />

      <EffectComposer multisampling={0} disableNormalPass>
        <Vignette />
        <Bloom mipmapBlur radius={0.9} luminanceThreshold={0.966} intensity={2} levels={4} />
        <LensFlare {...args} dirtTextureFile={'/lensDirtTexture.png'} />
      </EffectComposer>
    </>
  ),
  args: {},
}
