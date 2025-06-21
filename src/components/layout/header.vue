<script setup lang="ts">

</script>

<template>
    <div class="bg-(--color-primary) text-white py-2">
        <UiContainer>
            <div class="flex justify-between items-center">
                <div class="space-x-2">
                    <span class="badge bg-(--color-primary-dark) rounded-3xl font-semibold px-3 py-1">HOT</span>
                    <span>Free Express Shipping</span>
                </div>

                <div class="space-x-4 hidden md:flex">
                    <select
                        class="px-4 py-1 bg-slate-800 text-gray-100 rounded-md outline-0 cursor-pointer mr-6"
                    >
                        <option>Tiếng Việt</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>

                    <NuxtLink to="/">
                        <UiIcon name="brand-twitter" />
                    </NuxtLink>

                    <NuxtLink to="/">
                        <UiIcon name="brand-facebook" />
                    </NuxtLink>

                    <NuxtLink to="/">
                        <UiIcon name="brand-instagram" />
                    </NuxtLink>
                </div>
            </div>
        </UiContainer>
    </div>

    <div class="bg-white h-20 flex items-center border-b-1 border-gray-300">
        <UiContainer>
            <div class="flex justify-between items-center">
                <div>
                    <NuxtLink to="/">
                        <UiLazyLoad
                            alt="Random image"
                            class="w-full max-w-md"
                            src="https://image.mavangthangloi.com/_w300/storage/logos/mavangthangloi.png"
                        />
                    </NuxtLink>
                </div>

                <div
                    class="text-[14px] max-w-[800px] md:max-w-[600px] sm:hidden md:block flex-[1_1_0px]"
                >
                    <ul class="flex space-x-10 justify-end">
                        <li class="cursor-pointer">
                            Home
                        </li>

                        <li class="cursor-pointer">
                            Mega Menu
                        </li>

                        <li class="cursor-pointer">
                            Full Screen Menu
                        </li>

                        <li class="cursor-pointer">
                            Pages
                        </li>

                        <li class="cursor-pointer">
                            User Account
                        </li>
                    </ul>
                </div>

                <div
                    class="max-w-[350px] flex-[1_1_0px] xl:flex items-center space-x-4 md:hidden"
                >
                    <input
                        class="bg-(--color-bg) border-1 border-gray-300 hover:border-black outline-0 p-2 rounded-xl font-semibold w-full"
                        placeholder="Tìm kiếm sản phẩm và bài viết ..."
                        type="text"
                    />

                    <div class="space-x-4 hidden md:flex">
                        <NuxtLink to="/">
                            <UiIcon name="basket-check" />
                        </NuxtLink>

                        <NuxtLink to="/">
                            <UiIcon name="sun" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </UiContainer>
    </div>
</template>
