interface TypedAPI {
	hardware: {
    cpus: any,
    platform: any,
    totalmem: any,
    freemem: any
  },
  sendMessage: (...args) => void,
  invokeMessage: (...args) => void
}

export declare const API: TypedAPI;