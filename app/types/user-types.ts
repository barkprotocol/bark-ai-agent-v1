import type { Action, Message, Wallet as _PrismaWallet } from "@prisma/client"
import type { Prisma, User as _PrismaUser } from "@prisma/client"
import type { Conversation as _PrismaConversation } from "@prisma/client"
import type { User as _PrivyUser } from "@privy-io/react-auth"

export type EmbeddedWallet = Pick<
  _PrismaWallet,
  "id" | "ownerId" | "name" | "publicKey" | "walletSource" | "active" | "delegated" | "chain"
>

export type ConversationMeta = Pick<_PrismaConversation, "id" | "userId" | "title">

export type Conversation = _PrismaConversation & {
  messages: Message[]
}

export type PrivyUser = _PrivyUser

export type PrismaUser = _PrismaUser & {
  wallets: EmbeddedWallet[]
}

export type BarkUser = Pick<PrismaUser, "id" | "privyId" | "createdAt" | "updatedAt" | "earlyAccess" | "wallets"> & {
  privyUser: PrivyUser
  hasEAP: boolean
  telegramId?: string
}

export type NewAction = Omit<Action, "id">

export type ActionWithUser = Prisma.ActionGetPayload<{
  include: {
    user: {
      include: {
        wallets: true
      }
    }
  }
}>

export type ActionFull = Prisma.ActionGetPayload<{
  select: { [K in keyof Required<Prisma.ActionSelect>]: true }
}>

// Utility type for Prisma select
export type PrismaSelect<T> = {
  [K in keyof T]?: boolean
}

