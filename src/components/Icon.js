import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// The design draws from Phosphor. @expo/vector-icons ships with Expo, so each
// Phosphor glyph maps to its nearest Ionicons / MaterialCommunityIcons twin
// here rather than pulling in another icon font.
const MAP = {
  path: [MaterialCommunityIcons, 'chart-timeline-variant', 'chart-timeline-variant'],
  'hand-heart': [MaterialCommunityIcons, 'hand-heart-outline', 'hand-heart'],
  flask: [MaterialCommunityIcons, 'flask-outline', 'flask'],
  'chart-line-up': [MaterialCommunityIcons, 'chart-line-variant', 'chart-line-variant'],
  sparkle: [MaterialCommunityIcons, 'star-four-points-outline', 'star-four-points'],
  check: [Ionicons, 'checkmark', 'checkmark'],
  'caret-right': [Ionicons, 'chevron-forward', 'chevron-forward'],
  'caret-left': [Ionicons, 'chevron-back', 'chevron-back'],
  camera: [Ionicons, 'camera-outline', 'camera'],
  image: [Ionicons, 'image-outline', 'image'],
  plus: [Ionicons, 'add', 'add'],
  'arrow-left': [Ionicons, 'arrow-back', 'arrow-back'],
  gear: [Ionicons, 'settings-outline', 'settings'],
  cloud: [Ionicons, 'cloud-outline', 'cloud'],
  'cloud-check': [MaterialCommunityIcons, 'cloud-check-outline', 'cloud-check'],
  download: [Ionicons, 'download-outline', 'download'],
  trash: [Ionicons, 'trash-outline', 'trash'],
  x: [Ionicons, 'close', 'close'],
  warning: [Ionicons, 'warning-outline', 'warning'],
  pencil: [Ionicons, 'pencil-outline', 'pencil'],
};

export default function Icon({ name, size = 16, color = '#000', fill = false, style }) {
  const entry = MAP[name] || MAP.sparkle;
  const [Family, outline, solid] = entry;
  return <Family name={fill ? solid : outline} size={size} color={color} style={style} />;
}
