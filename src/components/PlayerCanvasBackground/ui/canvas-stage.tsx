import React, { useEffect, useRef } from 'react'
import { CanvasImage, usePlayerCanvasBackgroundContext } from '../context'
import Konva from 'konva'
import { Image as KonvaImage, Layer, Stage, Transformer } from 'react-konva'
import useImage from 'use-image'
import { KonvaEventObject } from 'konva/lib/Node'

const URLImage = ({
  image,
  setImages,
  centerX,
}: {
  image: CanvasImage
  setImages: React.Dispatch<React.SetStateAction<CanvasImage[]>>
  centerX: number
}) => {
  const { url, id, scaleX, scaleY, zIndex, ...restProps } = image

  const { selectedImage, setSelectedImage, setFlipFunction } =
    usePlayerCanvasBackgroundContext()

  const [img, loadState] = useImage(`${image.url}`)
  const imageRef = React.useRef<Konva.Image>(null)
  const trRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (imageRef.current === null) {
      console.log('imageRef.current is null')
      return
    }
    if (trRef.current === null) {
      console.log('trRef.current is null')
      return
    }

    trRef.current?.nodes([imageRef.current])
    trRef.current?.getLayer()?.batchDraw()
  }, [trRef.current, imageRef.current])

  const updateImages = (img: CanvasImage) => {
    console.log('updateImages()')
    setImages((prevImages) => [...prevImages.filter((i) => i.id !== id), img])
  }

  const flipImage = () => {
    console.log('flipImage()')
    const node = imageRef.current
    if (node) {
      const newScaleX = node.scaleX() * -1
      let rotation = node.rotation()

      console.log('old node.scaleX()', node.scaleX())
      console.log('old node.scaleY()', node.scaleY())

      node.scaleX(newScaleX)

      console.log('new node.scaleX()', node.scaleX())
      console.log('new node.scaleY()', node.scaleY())

      console.log('old image', selectedImage)

      const updatedImage = {
        ...image,
        scaleX: newScaleX,
        scaleY: node.scaleY(),
        x: node.x() - centerX,
        y: node.y(),
        rotation,
        width: node.width(),
        height: node.height(),
      }

      console.log('updatedImage', updatedImage)

      updateImages(updatedImage)
    }
  }

  const selectImage = (img: CanvasImage) => {
    setFlipFunction(flipImage)
    setSelectedImage(img)
  }

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    console.log('handleDragEnd()')
    const updatedImage = {
      ...image,
      x: e.target.x() - centerX,
      y: e.target.y(),
    }

    updateImages(updatedImage)
    selectImage(updatedImage)
  }

  const handleTransformEnd = () => {
    console.log('handleTransformEnd()')
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = imageRef.current
    if (node) {
      const transformScaleX = node.scaleX()
      const transformScaleY = node.scaleY()

      console.log('node.scale()', node.scale())

      console.log('old scaleX', transformScaleX)
      console.log('old scaleY', transformScaleY)

      const newScaleX = transformScaleX > 0 ? 1 : -1
      const newScaleY = transformScaleY > 0 ? 1 : -1

      // we will reset it back
      node.scaleX(newScaleX)
      node.scaleY(newScaleY)

      console.log('new scaleX', node.scaleX())
      console.log('new scaleY', node.scaleY())

      const updatedImage = {
        ...image,
        rotation: node.rotation(),
        width: Math.abs(Math.max(20, node.width() * transformScaleX)),
        height: Math.abs(node.height() * transformScaleY),
        x: node.x() - centerX,
        y: node.y(),
        scaleX: newScaleX,
        scaleY: newScaleY,
      }

      console.log('updatedImage', updatedImage)

      updateImages(updatedImage)
      selectImage(updatedImage)
    }
  }

  return (
    <>
      <KonvaImage
        ref={imageRef}
        image={img}
        {...restProps}
        x={restProps.x + centerX}
        draggable
        onClick={() => {
          console.log('image clicked', image)
          selectImage(image)
        }}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        scaleX={scaleX}
        scaleY={scaleY}
      />

      <Transformer
        ref={trRef}
        flipEnabled={true}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
            return oldBox
          }
          return newBox
        }}
        borderStroke={selectedImage?.id === id ? 'magenta' : undefined}
        borderStrokeWidth={selectedImage?.id === id ? 2 : 1}
        rotationSnaps={[0, 90, 180, 270, 45, -45, 135, 225]}
        rotationSnapTolerance={5}
        anchorCornerRadius={50}
      />
    </>
  )
}

export function CanvasStage({
  imageList,
  setImageList,
  width,
  height,
}: {
  imageList: CanvasImage[]
  setImageList: React.Dispatch<React.SetStateAction<CanvasImage[]>>
  width: number
  height: number
}) {
  const { setSelectedImage, setFlipFunction } =
    usePlayerCanvasBackgroundContext()
  const stageRef = useRef<Konva.Stage>(null)

  return (
    <>
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    position: 'absolute',*/}
      {/*    top: -50,*/}
      {/*    left: width - 60,*/}
      {/*    color: 'cyan',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {width}px*/}
      {/*</Box>*/}

      {/*{width > 1920 && (*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      position: 'absolute',*/}
      {/*      top: -24,*/}
      {/*      left: 1920 - 64,*/}
      {/*      height: 40,*/}
      {/*      color: 'cyan',*/}
      {/*      borderRight: '1px solid cyan',*/}
      {/*      paddingRight: 1,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    1920px*/}
      {/*  </Box>*/}
      {/*)}*/}

      <Stage
        ref={stageRef}
        width={width - 2}
        height={height}
        style={{
          position: 'absolute',
          border: '1px solid cyan',
          overflow: 'hidden',
          zIndex: 20,
        }}
        onClick={(e) => {
          if (e.target === stageRef.current) {
            setSelectedImage(null)
            setFlipFunction(null)
          }
        }}
      >
        <Layer>
          {imageList.map((image) => (
            <URLImage
              key={image.id}
              image={image}
              setImages={setImageList}
              centerX={width / 2}
            />
          ))}
        </Layer>
      </Stage>
    </>
  )
}
