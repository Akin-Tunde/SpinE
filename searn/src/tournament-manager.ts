import {
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  ScoreUpdated as ScoreUpdatedEvent,
  TournamentCreated as TournamentCreatedEvent,
  TournamentEnded as TournamentEndedEvent,
  TournamentJoined as TournamentJoinedEvent,
  Unpaused as UnpausedEvent
} from "../generated/TournamentManager/TournamentManager"
import {
  OwnershipTransferred,
  Paused,
  ScoreUpdated,
  TournamentCreated,
  TournamentEnded,
  TournamentJoined,
  Unpaused
} from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleScoreUpdated(event: ScoreUpdatedEvent): void {
  let entity = new ScoreUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tournamentId = event.params.tournamentId
  entity.participant = event.params.participant
  entity.score = event.params.score

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTournamentCreated(event: TournamentCreatedEvent): void {
  let entity = new TournamentCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.name = event.params.name
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.feeType = event.params.feeType
  entity.feeToken = event.params.feeToken
  entity.feeAmount = event.params.feeAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTournamentEnded(event: TournamentEndedEvent): void {
  let entity = new TournamentEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tournamentId = event.params.tournamentId
  entity.winners = changetype<Bytes[]>(event.params.winners)
  entity.prizes = event.params.prizes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTournamentJoined(event: TournamentJoinedEvent): void {
  let entity = new TournamentJoined(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tournamentId = event.params.tournamentId
  entity.participant = event.params.participant

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
