import Point2 from './Point2';

export type TRegionSize = 'big' | 'small';

export type TRegionDirection = 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SE' | 'SW';

export type TRegionConfig = {
    checkerCoordinate: Point2;
    dropRegion: Path2D;
};
