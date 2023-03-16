import Point2 from '../Point2';

export type TRegionSize = 'big' | 'small';

export type TRegionDirection = 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SE' | 'SW';

export type TCheckerType = 'some' | 'empty';

export type TChecker = {
    type: TCheckerType;
};

export type TRegionConfig = {
    checkerCoordinate: Point2;
    regionSettings: {
        path: Path2D,
        color: string;
        isActive: boolean;
        checker?: TChecker | null;
    }
};
