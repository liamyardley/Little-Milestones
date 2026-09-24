import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Icon from './Icon';
import { Body, Kicker, Title } from './ui';
import { C, FONT } from '../theme';

const COLORS = ['#efd171', '#dfb44a', '#f6e3a8', '#cfc7b5'];
const PIECES = 18;

const Confetti = ({ index, height }) => {
  const fall = useRef(new Animated.Value(0)).current;
  const size = 5 + (index % 3) * 3;
  const duration = (1.5 + (index % 5) * 0.28) * 1000;
  const delay = (index % 7) * 130;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fall, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [fall, duration, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: -40,
        left: `${(4 + (index * 5.4) % 92).toFixed(1)}%`,
        width: size,
        height: size,
        borderRadius: index % 3 === 0 ? size / 2 : 1,
        backgroundColor: COLORS[index % COLORS.length],
        opacity: fall.interpolate({ inputRange: [0, 0.12, 0.9, 1], outputRange: [0, 1, 1, 0] }),
        transform: [
          { translateY: fall.interpolate({ inputRange: [0, 1], outputRange: [0, height + 80] }) },
          {
            rotate: fall.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '520deg'] }),
          },
        ],
      }}
    />
  );
};

export default function Celebrate({ celebrate, onDismiss }) {
  const ring = useRef(new Animated.Value(0)).current;
  const halo = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const height = useMemo(() => Dimensions.get('window').height, []);

  useEffect(() => {
    if (!celebrate) return undefined;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    ring.setValue(0);
    Animated.spring(ring, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
    const haloLoop = Animated.loop(
      Animated.timing(halo, { toValue: 1, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    );
    haloLoop.start();
    pulseLoop.start();
    return () => {
      haloLoop.stop();
      pulseLoop.stop();
    };
  }, [celebrate, ring, halo, pulse]);

  if (!celebrate) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.fill} onPress={onDismiss}>
        {Array.from({ length: PIECES }, (_, i) => (
          <Confetti key={i} index={i} height={height} />
        ))}

        <View style={styles.markWrap}>
          <Animated.View
            style={[
              styles.halo,
              {
                opacity: halo.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }),
                transform: [{ scale: halo.interpolate({ inputRange: [0, 1], outputRange: [0.7, 2.4] }) }],
              },
            ]}
          />
          <Animated.View style={[styles.mark, { transform: [{ scale: ring }] }]}>
            <Icon name="check" size={36} color={C.accent900} fill />
          </Animated.View>
        </View>

        <Kicker color={C.accent800} style={{ marginTop: 24, letterSpacing: 1.6 }}>
          {celebrate.kicker}
        </Kicker>
        <Title size={23} style={styles.title}>{celebrate.title}</Title>
        <Body size={12} style={styles.blurb}>{celebrate.blurb}</Body>

        <Animated.Text style={[styles.hint, { opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }) }]}>
          Tap anywhere to keep going
        </Animated.Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'rgba(252,249,241,0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 34,
    overflow: 'hidden',
  },
  markWrap: { width: 96, height: 96, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 96, height: 96, borderRadius: 48, borderWidth: 1, borderColor: C.accent700 },
  mark: {
    width: 96, height: 96, borderRadius: 48, borderWidth: 1, borderColor: C.accent500,
    backgroundColor: 'rgba(223,180,74,0.20)', alignItems: 'center', justifyContent: 'center',
  },
  title: { marginTop: 9, textAlign: 'center' },
  blurb: { marginTop: 10, textAlign: 'center', maxWidth: 250 },
  hint: { fontFamily: FONT.regular, fontSize: 10, color: C.neutral600, marginTop: 26 },
});
