import React from 'react';
import { Transition } from '@headlessui/react';
import { Toaster, ToastIcon, resolveValue } from 'react-hot-toast';

const Toast = () => {
    return (
        <Toaster position="top-right">
            {(t) => (
                <Transition
                    appear
                    show={t.visible}
                    className="transform p-4 flex bg-white rounded shadow-lg"
                    enter="transition-all duration-300"
                    enterFrom="opacity-0 translate-x-full"
                    enterTo="opacity-100 scale-100 translate-x-0"
                    leave="transition-all duration-1000"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-75"
                >
                    <ToastIcon toast={t} />
                    <p className="px-2">{resolveValue(t.message)}</p>
                </Transition>
            )}
        </Toaster>
    );
};

export default Toast;
