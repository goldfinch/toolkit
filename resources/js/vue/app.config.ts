const cfg = {
  nuxtIcon: {},
  nui: {
    BaseButton: {
      variant: 'solid',
      rounded: 'sm',
      color: 'default',
      size: 'md',
    },
    BaseMessage: {
      color: 'default',
      rounded: 'sm',
    },
  },
}

const useAppConfig = () => cfg

export { useAppConfig }
