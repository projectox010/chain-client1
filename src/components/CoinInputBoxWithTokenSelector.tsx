import CoinInputBox, { CoinInputBoxProps } from './CoinInputBox'
import TokenSelectorDialog, { TokenSelectorProps } from './dialogs/TokenSelectorDialog'
import useToggle from '@/hooks/useToggle'

export type CoinInputBoxWithSelectorProps = Omit<CoinInputBoxProps, 'haveCoinIcon' | 'showTokenSelectIcon'> &
  Omit<TokenSelectorProps, 'open' | 'close'> & {
    tokenSelectorProps?: Partial<Omit<TokenSelectorProps, 'open' | 'close'>>
  }

// TODO: split into different customized component (to handle different use cases)
/**
 * support to input both token and lpToken
 */
export default function CoinInputBoxWithTokenSelector({ tokenSelectorProps, ...props }: CoinInputBoxWithSelectorProps) {
  const [isCoinSelectorOn, { on: turnOnCoinSelector, off: turnOffCoinSelector }] = useToggle()
  return (
    <>
      <CoinInputBox
        {...props}
        haveCoinIcon
        showTokenSelectIcon
        onTryToTokenSelect={() => {
          turnOnCoinSelector()
          props.onTryToTokenSelect?.()
        }}
      />
      <TokenSelectorDialog
        {...tokenSelectorProps}
        open={isCoinSelectorOn}
        onSelectCoin={(token) => {
          turnOffCoinSelector()
          props.onSelectCoin?.(token)
        }}
        close={turnOffCoinSelector}
      />
    </>
  )
}
