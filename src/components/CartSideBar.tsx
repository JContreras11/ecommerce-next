'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaBagShopping } from 'react-icons/fa6';
import { MdClose, MdStar } from 'react-icons/md';

import ButtonCircle3 from '@/shared/Button/ButtonCircle3';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import InputNumber from '@/shared/InputNumber/InputNumber';
import { useCartStore } from '@/store/cartStore';
import type { CartItem } from '@/types/product';

import LikeButton from './LikeButton';

export interface CartSideBarProps {}
const CartSideBar: React.FC<CartSideBarProps> = () => {
  const [isVisable, setIsVisable] = useState(false);
  const { items, removeItem, updateQuantity } = useCartStore();

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderProduct = (item: CartItem) => {
    const { title, image, price, category, rating, id, quantity } = item;

    const handleQuantityChange = (value: number) => {
      updateQuantity(id, value);
    };

    const handleRemoveItem = () => {
      removeItem(id);
    };

    return (
      <div key={title} className="flex py-5 last:pb-0">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            fill
            src={image}
            alt={title}
            className="size-full object-contain object-center"
          />
          <Link
            onClick={handleCloseMenu}
            className="absolute inset-0"
            href={`/products/${id}`}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="font-medium ">
                  <Link onClick={handleCloseMenu} href={`/products/${id}`}>
                    {title}
                  </Link>
                </h3>
                <span className="my-1 text-sm text-neutral-500">
                  {category}
                </span>
                <div className="flex items-center gap-1">
                  <MdStar className="text-yellow-400" />
                  <span className="text-sm">{rating.rate}</span>
                </div>
              </div>
              <span className=" font-medium">${price}</span>
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm">
            <div className="flex items-center gap-3">
              <LikeButton />
              <button onClick={handleRemoveItem} type="button">
                <AiOutlineDelete className="text-2xl" />
              </button>
            </div>
            <div>
              <InputNumber
                defaultValue={quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const calculateSubtotal = () => {
    return Number(
      items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
    ).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="z-max fixed inset-y-0 right-0 w-full max-w-md outline-none focus:outline-none md:max-w-md">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div className="relative z-20">
                <div className="overflow-hidden shadow-lg ring-1 ring-black/5">
                  <div className="relative h-screen bg-white">
                    <div className="hiddenScrollbar h-screen overflow-y-auto p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Shopping cart</h3>
                        <ButtonCircle3 onClick={handleCloseMenu}>
                          <MdClose className="text-2xl" />
                        </ButtonCircle3>
                      </div>
                      <div className="divide-y divide-neutral-300">
                        {items.map((item) => (
                          <div key={item.id}>{renderProduct(item)}</div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-neutral-50 p-5">
                      <p className="flex justify-between">
                        <span>
                          <span className="font-medium">Subtotal</span>
                          <span className="block text-sm text-neutral-500">
                            Shipping and taxes calculated at checkout.
                          </span>
                        </span>
                        <span className="text-xl font-medium">
                          {calculateSubtotal()}
                        </span>
                      </p>
                      <div className="mt-5 flex items-center gap-5">
                        <ButtonPrimary
                          href="/checkout"
                          onClick={handleCloseMenu}
                          className="w-full flex-1"
                        >
                          Checkout
                        </ButtonPrimary>
                        <ButtonSecondary
                          onClick={handleCloseMenu}
                          href="/cart"
                          className="w-full flex-1 border-2 border-primary text-primary"
                        >
                          View cart
                        </ButtonSecondary>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter=" duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="mx-5 flex items-center gap-1 rounded-full bg-neutral-100 p-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <FaBagShopping className="text-2xl" />
        <span className="hidden text-sm lg:block">{items.length} items</span>
      </button>

      {renderContent()}
    </>
  );
};

export default CartSideBar;
