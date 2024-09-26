import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CanvasImage } from './context';

const MOCK_API = process.env.NODE_ENV !== 'development';

let MOCK_IMAGES: CanvasImage[] = [
  {
    id: 1,
    x: 0,
    y: 0,
    rotation: 0,
    url: 'https://ttv.madf12.com/mge/static/rofls/canny.webp',
    width: 200,
    height: 200,
    zIndex: 0,
    scaleX: 1,
    scaleY: 1,
  },
  // {
  //   id: 2,
  //   x: 0,
  //   y: 0,
  //   rotation: 0,
  //   url: 'https://ttv.madf12.com/mge/static/rofls/cat1.webp',
  //   width: 200,
  //   height: 200,
  //   zIndex: 0,
  //   scaleX: 1,
  // },
  // {
  //   id: 3,
  //   x: 0,
  //   y: 0,
  //   rotation: 0,
  //   url: 'https://ttv.madf12.com/mge/static/rofls/cuteCat.webp',
  //   width: 200,
  //   height: 200,
  //   zIndex: 0,
  //   scaleX: 1,
  // },
  // {
  //   id: 4,
  //   x: 0,
  //   y: 0,
  //   rotation: 0,
  //   url: 'https://ttv.madf12.com/mge/static/rofls/plink.webp',
  //   width: 200,
  //   height: 200,
  //   zIndex: 0,
  //   scaleX: 1,
  // },
  // {
  //   id: 5,
  //   x: 0,
  //   y: 0,
  //   rotation: 0,
  //   url: 'https://media1.tenor.com/m/5BYK-WS0__gAAAAd/cool-fun.gif',
  //   width: 200,
  //   height: 200,
  //   zIndex: 0,
  //   scaleX: 1,
  // },
];

async function request(url: RequestInfo, opt: RequestInit) {
  const res = await fetch(url, opt);

  if (!res.ok) {
    return Promise.reject(new Error());
  }

  return res.json();
}

async function fetchImages(playerId: number): Promise<CanvasImage[]> {
  if (MOCK_API) {
    return Promise.resolve(MOCK_IMAGES);
  }

  const { objects } = await request(`/api/canvas/${playerId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  return objects;
}

export function useGetCanvasImages(playerId: number) {
  return useQuery({
    initialData: [],
    queryKey: ['canvas-images', playerId],
    queryFn: () => fetchImages(playerId),
    select: (data) => {
      return data.sort((a, b) => a.zIndex - b.zIndex);
    },
    refetchInterval: 15000,
  });
}

function saveCanvasImages(playerId: number, imageList: CanvasImage[]) {
  if (MOCK_API) {
    MOCK_IMAGES = imageList;
    console.log('MOCK_IMAGES', MOCK_IMAGES);
    return Promise.resolve(new Response());
  }

  return request(`/api/canvas/${playerId}/update`, {
    method: 'PUT',
    body: JSON.stringify(imageList),
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function useSaveCanvasImages(playerId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageList: CanvasImage[]) => saveCanvasImages(playerId, imageList),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: ['canvas-images', playerId] });
    },
  });
}

function uploadCanvasImage(playerId: number, file: File, width: number, height: number) {
  if (MOCK_API) {
    MOCK_IMAGES.push({
      id: MOCK_IMAGES.length + 1,
      x: 0,
      y: 0,
      rotation: 0,
      url: URL.createObjectURL(file),
      width,
      height,
      zIndex: 0,
      scaleX: 1,
      scaleY: 1,
    });
    return Promise.resolve(new Response());
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('width', width.toString());
  formData.append('height', height.toString());

  return request(`/api/canvas/${playerId}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function useUploadCanvasImage(playerId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { file: File, width: number, height: number }) =>
      uploadCanvasImage(playerId, data.file, data.width, data.height),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: ['canvas-images', playerId] });
    },
  });
}
