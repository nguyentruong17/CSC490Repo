import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert
} from 'react-native';

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { Gravity, MovePointer, CleanDebris } from './src/logic';

import { setupInitialWorld, handleCollision } from './src/utils/game'


const App = (props) => {
  const engine = Matter.Engine.create({ enableSleeping: false });

  const { entities } = setupInitialWorld(engine)

  handleCollision(engine, entities)

  return (
    <GameEngine
      style={styles.container
      }
      systems={[Gravity, MovePointer, CleanDebris]}
      entities={entities}
    />

  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
