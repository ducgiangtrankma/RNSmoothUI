import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../utils/color';

const OrderSvg = ({size = 21, color = Colors.typography}) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 19 21">
    <Path
      d="M13.516.917H5.485C2.57.917.875 2.623.875 5.545v9.9c0 2.97 1.696 4.638 4.61 4.638h8.031c2.96 0 4.609-1.667 4.609-4.638v-9.9c0-2.922-1.648-4.628-4.609-4.628Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.743 5.373v.01a.748.748 0 0 0 0 1.494h2.864a.751.751 0 0 0 .749-.758.748.748 0 0 0-.749-.746H5.743Zm7.513 5.836H5.743a.748.748 0 0 1 0-1.496h7.513a.748.748 0 0 1 0 1.496Zm0 4.38H5.743a.744.744 0 0 1-.719-.345.762.762 0 0 1 .719-1.16h7.513c.383.038.671.364.671.757a.75.75 0 0 1-.67.748Z"
      fill="#fff"
    />
  </Svg>
);
const ProfileSvg = ({size = 21, color = Colors.typography}) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 19 21">
    <Path
      d="M9.5 11.565c2.977 0 5.39-2.384 5.39-5.324S12.478.917 9.5.917 4.11 3.3 4.11 6.24c0 2.94 2.413 5.324 5.39 5.324Z"
      fill={color}
    />
    <Path
      d="M18.116 16.898a1.762 1.762 0 0 0 0-.228c-.022-.28-.101-.554-.234-.805-.524-1.024-1.994-1.488-3.22-1.75-.874-.183-1.763-.3-2.657-.35l-.936-.07H7.925l-.936.07c-.894.05-1.783.167-2.657.35-1.226.227-2.695.7-3.22 1.75a2.054 2.054 0 0 0-.233.805 1.776 1.776 0 0 0 0 .227 1.925 1.925 0 0 0 0 .228c.025.278.108.548.243.797.524 1.023 1.993 1.487 3.219 1.75.876.173 1.764.29 2.658.35l.935.061H11.08l.935-.061a20.82 20.82 0 0 0 2.658-.35c1.226-.236 2.695-.7 3.22-1.75a2.27 2.27 0 0 0 .233-.814c.001-.07-.002-.14-.01-.21Z"
      fill={color}
    />
  </Svg>
);
const GpsSvg = ({color = Colors.typography, size = 24}) => (
  <Svg width={size} height={size} viewBox="0 0 21 24" fill="none">
    <Path
      d="M18.849 4.719a9.871 9.871 0 0 0-8.453-4.72 9.867 9.867 0 0 0-8.453 4.72 10.43 10.43 0 0 0-1.036 8.226c1.717 5.905 7.483 9.738 9.076 10.7a.8.8 0 0 0 .822 0c1.594-.965 7.359-4.8 9.076-10.7a10.427 10.427 0 0 0-1.032-8.226Zm-8.453 8.829a3.384 3.384 0 1 1 .002-6.768 3.384 3.384 0 0 1-.002 6.768Z"
      fill={color}
    />
  </Svg>
);
const LogoutSvg = ({sizeRatio = 1}) => (
  <Svg
    width={17 * sizeRatio}
    height={19 * sizeRatio}
    fill="none"
    viewBox="0 0 17 19">
    <Path
      d="m13.971 4.289-.002-.003a1.152 1.152 0 0 0-1.533-.19 1.243 1.243 0 0 0-.39 1.572l.002.003c.062.125.162.252.282.371l.002.002c1.436 1.454 2.013 3.23 1.502 5.285-.487 1.96-1.742 3.263-3.59 3.848-1.8.569-3.497.206-4.95-1.016-1.253-1.05-1.894-2.464-1.916-4.13-.02-1.328.426-2.503 1.246-3.506a1.783 1.783 0 0 1 .222-.222c.057-.05.092-.081.122-.115l.003-.003c.33-.356.418-.76.274-1.233-.145-.467-.453-.732-.917-.826-.339-.068-.645.017-.947.26H3.38c-.602.48-1.025 1.13-1.419 1.865-.662 1.238-.96 2.573-.913 3.994.056 1.733.605 3.272 1.64 4.623.981 1.279 2.208 2.176 3.692 2.629 2.532.775 4.872.37 6.992-1.29 1.373-1.072 2.274-2.498 2.722-4.24v-.001a7.925 7.925 0 0 0 .245-1.984c-.031-2.165-.772-4.007-2.231-5.538l.29-.276-.29.277-.113-.129a2.106 2.106 0 0 0-.024-.027Z"
      fill="#FE724C"
      stroke="#fff"
      strokeWidth={0.8}
    />
    <Path
      d="M7.112 7.656c.002.84.614 1.537 1.41 1.617.826.085 1.564-.47 1.727-1.308.024-.12.027-.242.027-.364m-3.164.055a805.496 805.496 0 0 1 0-5.317c0-.602.272-1.07.76-1.375C8.383.643 8.927.63 9.448.93c.533.306.82.792.823 1.433M7.112 7.656h.4c.002.648.471 1.16 1.05 1.219h.002c.612.063 1.167-.345 1.293-.987.015-.078.019-.166.019-.286m-2.764.054.4-.001 2.364-.053m.394-5.239a370.499 370.499 0 0 1 0 2.642c0 1.11 0 1.487.006 2.596m-.006-5.238-.4.002m.4-.002-.4.001m.406 5.237-.4.002m.4-.002h-.4v.001m0 0c-.006-1.11-.006-1.488-.006-2.597V4.002c.001-.502.002-.92 0-1.637m.006 5.237L7.512 2.34v-.001c0-.461.198-.802.573-1.036.386-.243.771-.251 1.163-.026.408.234.62.587.622 1.088"
      fill="#FE724C"
      stroke="#fff"
      strokeWidth={0.8}
    />
  </Svg>
);
const DiscoverSvg = ({size = 25, color = Colors.typography}) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 25">
    <Path
      d="M11.97.332a11.855 11.855 0 1 0 0 23.71 11.855 11.855 0 0 0 0-23.71Zm4.433 8.348-1.687 5.743a.744.744 0 0 1-.505.506l-5.748 1.692a.747.747 0 0 1-.925-.937l1.756-5.683a.746.746 0 0 1 .493-.493l5.68-1.75a.747.747 0 0 1 .936.922Z"
      fill={color}
    />
  </Svg>
);
const CartSvg = ({size = 25, color = Colors.typography}) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 22 25">
    <Path
      d="M20.972 10.072a4.105 4.105 0 0 0-3.859-3.64v-.284A6.129 6.129 0 0 0 15.312 1.8 6.133 6.133 0 0 0 10.962 0a6.151 6.151 0 0 0-6.148 6.15v.286a4.105 4.105 0 0 0-3.788 3.639L0 19.419a4.728 4.728 0 0 0 4.74 4.709h12.52a4.728 4.728 0 0 0 4.74-4.71l-1.028-9.346ZM6.62 6.16a4.342 4.342 0 1 1 8.686 0v.264H6.62v-.264Zm.856 6.388a1.09 1.09 0 1 1 .419-2.1 1.09 1.09 0 0 1-.419 2.1Zm7.05 0a1.093 1.093 0 0 1-1.01-1.51 1.093 1.093 0 1 1 1.428 1.427 1.09 1.09 0 0 1-.418.083Z"
      fill={color}
    />
  </Svg>
);
const HeartSvg = ({size = 22, color = Colors.typography}) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 22 20">
    <Path
      d="M15.866 0a5.78 5.78 0 0 0-5.039 2.95A5.78 5.78 0 0 0 5.787 0 6.117 6.117 0 0 0 0 6.16c0 8.027 10.827 13.627 10.827 13.627S21.654 14.19 21.654 6.16A6.117 6.117 0 0 0 15.866 0Z"
      fill={color}
    />
  </Svg>
);
const StarSvg = ({color = Colors.typography, size = 11}) => (
  <Svg width={size} height={size} viewBox="0 0 11 10">
    <Path
      d="M8.94 9.446 5.888 7.841 2.833 9.446l.584-3.4L.944 3.636l3.415-.496L5.887 0l1.529 3.141 3.415.496-2.474 2.41.584 3.399Z"
      fill={color}
    />
  </Svg>
);
const SearchSvg = ({color = Colors.typography, size = 16}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      d="m11.047 11.4 3.453 3.1"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);
const ArrowLeftSvg = ({size = 24, color = Colors.typography}) => (
  <Svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="arrowLeftIconTitle"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    viewBox="0 0 24 24"
    color={color}>
    <Path d="m9 6-6 6 6 6M21 12H4M3 12h1" />
  </Svg>
);
const CheckSvg = ({size = 24, color = Colors.typography}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 405.272 405.272">
    <Path
      fill={color}
      d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"
    />
  </Svg>
);
const RightArrowIcon = (props: any) => (
  <Svg
    width={16}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.94 14.097a.495.495 0 0 1-.354-.147.503.503 0 0 1 0-.706l4.347-4.347a.82.82 0 0 0 0-1.16L5.586 3.39a.503.503 0 0 1 0-.706.503.503 0 0 1 .707 0L10.64 7.03c.34.34.533.8.533 1.287 0 .487-.187.947-.533 1.287L6.293 13.95a.524.524 0 0 1-.353.147Z"
      fill={props.fill ?? '#333'}
    />
  </Svg>
);
export {
  OrderSvg,
  ProfileSvg,
  GpsSvg,
  LogoutSvg,
  DiscoverSvg,
  CartSvg,
  HeartSvg,
  StarSvg,
  SearchSvg,
  ArrowLeftSvg,
  CheckSvg,
  RightArrowIcon,
};
