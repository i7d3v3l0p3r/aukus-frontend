import React from 'react';
import { CanvasImage, usePlayerCanvasBackgroundContext } from '../context';
import { useSaveCanvasImages, useUploadCanvasImage } from '../queries';
import { Button, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';

export function ControlButtons({ imageList, setImageList }: {
  imageList: CanvasImage[];
  setImageList: React.Dispatch<React.SetStateAction<CanvasImage[]>>;
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    selectedImage,
    setSelectedImage,
    setIsEditMode,
    player,
    images,
    flipFunction,
    setFlipFunction,
  } = usePlayerCanvasBackgroundContext();

  const saveMutation = useSaveCanvasImages(player.id);

  const uploadMutation = useUploadCanvasImage(player.id);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;

    const image = new window.Image();
    image.onload = () => {
      uploadMutation.mutate({
        file: file,
        width: image.width,
        height: image.height,
      }, {
        onSuccess: () => {
          console.log('Image uploaded');
          enqueueSnackbar('Изображение загружено', {
            variant: 'success',
            autoHideDuration: 3000,
          });
        },
        onError: (error) => {
          console.error('Failed to upload image');
          console.error(error);

          enqueueSnackbar('Не удалось загрузить изображение', {
            variant: 'error',
            autoHideDuration: 6000,
          });
        },
        onSettled: () => {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
      });
    };
    image.src = URL.createObjectURL(file);
  };

  const onUploadClick = () => fileInputRef.current?.click();

  const handleImageDelete = () => {
    if (!selectedImage) return;

    const newList = imageList.filter(i => i.id !== selectedImage.id);
    setSelectedImage(null);
    setFlipFunction(null);

    handleSave(newList);
  };

  const handleSave = (newList?: CanvasImage[]) => {
    const list = (newList || imageList).map((el, i) => ({
      ...el,
      zIndex: i,
    }));

    saveMutation.mutate(list, {
      onSuccess: () => {
        console.log('Saved');
        enqueueSnackbar(newList ? 'Изображение удалено' : 'Сохранено', {
          variant: 'success',
          autoHideDuration: 3000,
        });
      },
      onError: (error) => {
        console.error('Failed to save images');
        console.error(error);
        enqueueSnackbar(newList ? 'Произошла ошибка при удалении' : 'Произошла ошибка при сохранении', {
          variant: 'error',
          autoHideDuration: 6000,
        });
      },
    });
  };

  const handleChangeEditMode = () => {
    let disableEditMode = true;
    if (imageList.length !== images.length) {
      disableEditMode = window.confirm('Вы забыли сохранить изображения');
    }
    setIsEditMode(!disableEditMode);
  };

  return (
    <>
      <Button
        variant="contained"
        color="info"
        onClick={handleChangeEditMode}
      >
        Отмена
      </Button>

      <Button
        variant="contained"
        color="secondary"
        disabled={!flipFunction}
        onClick={() => flipFunction?.()}
      >
        Отразить
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleImageDelete}
        disabled={!selectedImage}
      >
        Удалить
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleSave()}
      >
        Сохранить
      </Button>

      <Divider orientation="vertical" color="#414141" flexItem sx={{
        borderRadius: 10,
        borderRightWidth: 4,
        marginY: '7px',
      }} />

      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <Button
        variant="contained"
        color="success"
        onClick={onUploadClick}
      >
        {uploadMutation.isPending ? 'Загрузка...' : 'Загрузить фото'}
      </Button>
    </>
  );
}
