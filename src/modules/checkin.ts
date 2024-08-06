import { signedFetch } from '~system/SignedFetch'
import { getPlayer } from '@mtvproject/sdk/src/players'

export async function checkin() {
  const player = getPlayer()
  signedFetch({
    url: 'https://treasury-hunt.memetaverse.club/api/v1/checkins',
    init: {
      method: 'POST',
      headers: {},
      body: JSON.stringify({})
    }
  })
}
