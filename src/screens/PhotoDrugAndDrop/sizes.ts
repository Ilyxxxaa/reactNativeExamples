import {Dimensions} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils/normalize';

export const MARGIN = responsiveWidth(8);

export const PADDING = responsiveWidth(12);

export const CONTAINER_HEIGHT = responsiveHeight(344);

export const CONTAINER_WIDTH =
  Dimensions.get('screen').width - 2 * MARGIN - 2 * PADDING;

export const CARD_HEIGHT = responsiveHeight(156);
export const CARD_WIDTH = responsiveWidth(106);

export const CARDS_GAP = responsiveWidth(8);
