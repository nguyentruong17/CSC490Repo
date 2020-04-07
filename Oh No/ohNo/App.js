import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { Gravity, MovePointer, SpawnDebris, CleanDebris } from './src/logic';

import { setupInitialWorld, handleCollision } from './src/utils/game'


const App = (props) => {
  const engine = Matter.Engine.create({ enableSleeping: false });

  const { entities } = setupInitialWorld(engine)

  const [score, setScore] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  handleCollision(engine, entities, {
      scoring: {
        score, 
        setScore
      },
      running: {
        isRunning,
        setIsRunning
      }  
  })

  return (
    <GameEngine
      style={styles.container}
      running={isRunning}
      systems={[Gravity, MovePointer, SpawnDebris, CleanDebris]}
      entities={entities}
    >
      <View style={styles.header}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
    </GameEngine>

  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default App;
