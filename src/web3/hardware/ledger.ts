import TransportWebUSB from '@ledgerhq/hw-transport-webusb'

export const connect = async () => {
  const a = await TransportWebUSB.create()
  console.log(a)
}
// connect()