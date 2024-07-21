
export function useAppConfig() {

  return {
    toaster: {
      duration: 6000,
      dismissible: false,
      theme: {
        maxToasts: 1,
        containerId: 'top-end',
        containerClass: [
          'fixed',
          'inset-0',
          'pointer-events-none',
          'p-4',
          'flex',
          'flex-col', // top
          'overflow-hidden',
          'z-[200]',
          'items-end', // end
          'gap-2',
          'space-y-3',
        ],
        wrapperClass: [
          'pointer-events-auto',
          'focus:outline-none',
          'rounded',
          'outline-slate-300',
          'outline-offset-2',
          'focus:outline',
          'focus:outline-2',
          'focus-within:outline',
          'focus-within:outline-2',
        ],
        transition: {
          enterActiveClass: 'transition duration-300 ease-out',
          enterFromClass: 'transform translate-x-full opacity-0',
          enterToClass: 'transform translate-x-0 opacity-100',
          leaveActiveClass: 'transition duration-200 ease-in',
          leaveFromClass: 'transform translate-x-0 opacity-100',
          leaveToClass: 'transform translate-x-full opacity-0',
        },
      },
    },
  }
}
