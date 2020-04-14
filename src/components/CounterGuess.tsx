import React, { useContext } from "react";
import { Team } from "../state/AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { Button } from "./Button";
import { GameModelContext } from "../state/GameModelContext";
import { ScoreRound } from "../state/ScoreForPlayerTeam";

export function CounterGuess() {
  const { state: gameState, localPlayer, clueGiver, setGameState } = useContext(
    GameModelContext
  );

  if (!clueGiver) {
    return null;
  }

  const notMyTurn = clueGiver.team === localPlayer.team;
  const counterGuessTeamString =
    clueGiver.team === Team.Left ? "RIGHT BRAIN" : "LEFT BRAIN";

  if (notMyTurn) {
    return (
      <div>
        <Spectrum
          spectrumCard={gameState.spectrumCard}
          guessingValue={gameState.guess}
        />
        <CenteredColumn>
          <div>
            {clueGiver.name}'s clue: <strong>{gameState.clue}</strong>
          </div>
          <div>Waiting for {counterGuessTeamString} to guess left/right...</div>
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      <Spectrum
        spectrumCard={gameState.spectrumCard}
        guessingValue={gameState.guess}
      />
      <CenteredColumn>
        <div>
          {clueGiver.name}'s clue: <strong>{gameState.clue}</strong>
        </div>
      </CenteredColumn>
      <CenteredRow>
        <Button
          text="Target is to the Left"
          onClick={() =>
            setGameState(ScoreRound(gameState, localPlayer.id, "left"))
          }
        />
        <Button
          text="Target is to the Right"
          onClick={() =>
            setGameState(ScoreRound(gameState, localPlayer.id, "right"))
          }
        />
      </CenteredRow>
    </div>
  );
}
