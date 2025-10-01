import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  Paused,
  ScoreUpdated,
  TournamentCreated,
  TournamentEnded,
  TournamentJoined,
  Unpaused
} from "../generated/TournamentManager/TournamentManager"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createScoreUpdatedEvent(
  tournamentId: BigInt,
  participant: Address,
  score: BigInt
): ScoreUpdated {
  let scoreUpdatedEvent = changetype<ScoreUpdated>(newMockEvent())

  scoreUpdatedEvent.parameters = new Array()

  scoreUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tournamentId",
      ethereum.Value.fromUnsignedBigInt(tournamentId)
    )
  )
  scoreUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )
  scoreUpdatedEvent.parameters.push(
    new ethereum.EventParam("score", ethereum.Value.fromUnsignedBigInt(score))
  )

  return scoreUpdatedEvent
}

export function createTournamentCreatedEvent(
  id: BigInt,
  name: string,
  startTime: BigInt,
  endTime: BigInt,
  feeType: i32,
  feeToken: Address,
  feeAmount: BigInt
): TournamentCreated {
  let tournamentCreatedEvent = changetype<TournamentCreated>(newMockEvent())

  tournamentCreatedEvent.parameters = new Array()

  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "feeType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(feeType))
    )
  )
  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam("feeToken", ethereum.Value.fromAddress(feeToken))
  )
  tournamentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "feeAmount",
      ethereum.Value.fromUnsignedBigInt(feeAmount)
    )
  )

  return tournamentCreatedEvent
}

export function createTournamentEndedEvent(
  tournamentId: BigInt,
  winners: Array<Address>,
  prizes: Array<BigInt>
): TournamentEnded {
  let tournamentEndedEvent = changetype<TournamentEnded>(newMockEvent())

  tournamentEndedEvent.parameters = new Array()

  tournamentEndedEvent.parameters.push(
    new ethereum.EventParam(
      "tournamentId",
      ethereum.Value.fromUnsignedBigInt(tournamentId)
    )
  )
  tournamentEndedEvent.parameters.push(
    new ethereum.EventParam("winners", ethereum.Value.fromAddressArray(winners))
  )
  tournamentEndedEvent.parameters.push(
    new ethereum.EventParam(
      "prizes",
      ethereum.Value.fromUnsignedBigIntArray(prizes)
    )
  )

  return tournamentEndedEvent
}

export function createTournamentJoinedEvent(
  tournamentId: BigInt,
  participant: Address
): TournamentJoined {
  let tournamentJoinedEvent = changetype<TournamentJoined>(newMockEvent())

  tournamentJoinedEvent.parameters = new Array()

  tournamentJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "tournamentId",
      ethereum.Value.fromUnsignedBigInt(tournamentId)
    )
  )
  tournamentJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )

  return tournamentJoinedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
