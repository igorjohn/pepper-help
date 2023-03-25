<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
// ExclamationTriangleIcon

const open = ref(true)
</script>

<script>
export default {
    data() {
        return {
            classes: {
                label: 'block text-sm font-semibold leading-6 text-gray-900',
                input: 'block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-indigo-500 sm:text-sm sm:leading-6 transition duration-400',
            }
        }
    }
}
</script>

<template>
    <div class="isolate pb-12 px-3 lg:px-6">

        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">Fale com a Pepper</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
        </div>

        <form action="#" method="POST" class="mx-auto mt-12 max-w-2xl">
            <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">

                <div class="sm:col-span-2">
                    <label for="name" :class="classes.label">Nome completo:</label>
                    <div class="mt-2.5">
                        <input type="text" name="name" id="name" autocomplete="name" :class="classes.input" />
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="name" :class="classes.label">Digite seu e-mail:</label>
                    <div class="mt-2.5">
                        <input type="email" name="email" id="email" autocomplete="email" :class="classes.input" />
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="name" :class="classes.label">CPF ou CNPJ:</label>
                    <div class="mt-2.5">
                        <input type="text" name="company" id="company" autocomplete="organization" :class="classes.input" />
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="name" :class="classes.label">Celular com WhatsApp:</label>
                    <div class="relative mt-2.5">
                        <div class="absolute inset-y-0 left-0 flex items-center">
                            <select id="country" name="country" class="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                <option>US</option>
                                <option>CA</option>
                                <option>EU</option>
                            </select>
                        </div>
                        <input type="tel" name="phone-number" id="phone-number" autocomplete="tel" class="block w-full rounded-md border-0 py-2 px-3.5 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="name" :class="classes.label">Mensagem:</label>
                    <div class="mt-2.5">
                        <textarea name="message" id="message" rows="4" :class="classes.input" />
                    </div>
                </div>

            </div>
            <div class="mt-10">
                <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar mensagem</button>
            </div>
    </form>
</div>

    <hr class="w-full mt-8" />


    <!-- Modal send message -->
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-6 mx-auto text-center max-w-2xl">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white w-full px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <CheckIcon class="h-6 w-6 text-green-600" />
                                </div>
                                <!-- <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                                <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
                                            </div> -->
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 mb-2">
                                        Mensagem enviada com sucesso.
                                    </DialogTitle>
                                    <p class="text-sm text-gray-500">
                                        Em breve você receberá uma resposta.
                                    </p>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-0" @click="open = false">
                                    Voltar
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>