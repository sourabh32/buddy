import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function MyModal({text,isOpen,setIsOpen,children}) {
  

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={open}
        className="btn-primary"
      >
        {text}
      </Button>

      <Dialog open={isOpen} as="div" className="relative w-[80%] mix-w-20 min-h-screen z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[80%] min-w-[80vh] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
             
              {
                children
              }
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}