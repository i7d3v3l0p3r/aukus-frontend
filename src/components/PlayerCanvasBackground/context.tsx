import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useGetCanvasImages } from './queries';
import { Player } from '../../utils/types';

export type CanvasImage = {
  id: number;
  rotation: number;
  x: number;
  y: number;
  url: string;
  width: number;
  height: number;
  zIndex: number;
  scaleX: number;
  scaleY: number;
};

type FlipFunction = () => void;

interface ContextType {
  images: CanvasImage[];
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  selectedImage: CanvasImage | null;
  setSelectedImage: Dispatch<SetStateAction<CanvasImage | null>>;
  player: Player;
  flipFunction: FlipFunction | null;
  setFlipFunction: (func: FlipFunction | null) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const PlayerCanvasBackgroundContextProvider = ({ children, player }: {
  children: React.ReactNode,
  player: Player
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CanvasImage | null>(null);
  const flipFunctionRef = React.useRef<FlipFunction | null>(null);

  const { data } = useGetCanvasImages(player.id);

  const setFlipFunction = useCallback((func: FlipFunction | null) => {
    flipFunctionRef.current = func;
  }, []);

  const value = useMemo(() => ({
    images: data,
    isEditMode,
    setIsEditMode,
    selectedImage,
    setSelectedImage,
    player,
    flipFunction: flipFunctionRef.current,
    setFlipFunction: setFlipFunction,
  }), [data, isEditMode, selectedImage, player, flipFunctionRef.current, setFlipFunction]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};


export const usePlayerCanvasBackgroundContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('usePlayerCanvasBackgroundContext must be used within PlayerCanvasBackgroundContextProvider');
  }

  return context;
};
