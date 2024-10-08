import Flex from './Flex.js';

import { getTileClasses } from './shared/utils.js';

import type { RangeType, Value } from './shared/types.js';
import { useEffect } from 'react';

type TileGroupProps = {
  className?: string;
  activeClassName?:string
  nowClassName?:string
  count?: number;
  dateTransform: (point: number) => Date;
  dateType: RangeType;
  end: number;
  hover?: Date | null;
  offset?: number;
  renderTile: (props: { classes: string[]; date: Date }) => React.ReactElement;
  start: number;
  step?: number;
  value?: Value;
  valueType: RangeType;
};

export default function TileGroup({
  className,
  count = 3,
  dateTransform,
  dateType,
  end,
  activeClassName,
  nowClassName,
  hover,
  offset,
  renderTile,
  start,
  step = 1,
  value,
  valueType,
}: TileGroupProps): React.ReactElement {
  const tiles = [];
  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);
    console.log(nowClassName,activeClassName)
    tiles.push(
      renderTile({
        classes: getTileClasses({
          date,
          dateType,
          hover,
          value,
          valueType,
          activeClassName,
          nowClassName,
        }),
        date,
      }),
    );
  }

  return (
    <Flex className={className} count={count} offset={offset} wrap>
      {tiles}
    </Flex>
  );
}
