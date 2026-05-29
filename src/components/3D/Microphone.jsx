import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Decal, Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function Microphone({ scrollProgress = 0, size = 1 }) {
  const group = useRef()
  const [logoTexture, setLogoTexture] = useState(null)

  useEffect(() => {
    // Use environment variable for the correct path
    const baseUrl = import.meta.env.VITE_BASE_URL
    const logoPath = `${baseUrl}logo.png`
    
    console.log('Loading logo from:', logoPath)
    
    const loader = new THREE.TextureLoader()
    loader.load(
      logoPath,
      (texture) => {
        texture.anisotropy = 16
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        setLogoTexture(texture)
        console.log('✅ Logo texture loaded successfully')
      },
      undefined,
      (error) => {
        console.error('❌ Failed to load logo texture:', error)
      }
    )
  }, [])

  useFrame((state) => {
    if (!group.current) return

    let yPosition
    
    if (scrollProgress < 0.5) {
      const riseProgress = scrollProgress / 0.5
      yPosition = -4 + (riseProgress * 4)
    } else {
      const moveProgress = (scrollProgress - 0.5) / 0.5
      yPosition = 0 + (moveProgress * 5)
    }
    
    group.current.position.y = yPosition
    group.current.scale.setScalar(0.9 * size)
    group.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={0.8} color="#ffaa66" />
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <group ref={group} position={[0, 0, 0]}>
          <mesh position={[0, -1.1, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 2.5, 64]} />
            <meshPhysicalMaterial color="#0a0a0a" metalness={0.9} roughness={0.35} clearcoat={1} clearcoatRoughness={0.2} />
          </mesh>

          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.42, 64, 64]} />
            <meshPhysicalMaterial color="#050505" metalness={1} roughness={0.5} />
          </mesh>

          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.425, 32, 32]} />
            <meshStandardMaterial color="#111111" wireframe transparent opacity={0.25} />
          </mesh>

          <RoundedBox args={[1.25, 0.72, 1.25]} radius={0.06} smoothness={4} position={[0, -0.2, 0]}>
            <meshPhysicalMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} clearcoat={1} />

            {logoTexture && (
              <>
                <Decal position={[0, 0, 0.63]} rotation={[0, 0, 0]} scale={[1.1, 0.55, 0.55]} map={logoTexture} />
                <Decal position={[0, 0, -0.63]} rotation={[0, Math.PI, 0]} scale={[1.1, 0.55, 0.55]} map={logoTexture} />
                <Decal position={[-0.63, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[1.1, 0.55, 0.55]} map={logoTexture} />
                <Decal position={[0.63, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1.1, 0.55, 0.55]} map={logoTexture} />
              </>
            )}
          </RoundedBox>
        </group>
      </Float>
    </>
  )
}
