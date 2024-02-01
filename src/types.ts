export type proxyType = "http" | "socks"
export type config = {
    _2captchaApiKey : string,
    ProxyType : proxyType,
    Rpc: string,
    DelayTimeRange: DelayTimeRange,
}

export type DelayTimeRange = {
    timeSecMin: number;
    timeSecMax: number;
}